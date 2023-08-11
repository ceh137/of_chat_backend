const {createCharge} = require("../services/coinbase");
const User = require('../models/user_model')
const Wallet = require('../models/wallet')
const sequelize = require("../utils/db");
const Transaction = require("../models/transaction");
var Webhook = require('coinbase-commerce-node').Webhook;


exports.createCheckout = async (req, res, next) => {
    try {
        const {amount, userId} = req.body;

        const user = await User.findByPk(+userId)
        const charge = await createCharge(amount, user);

        return res.status(201).json( {
            charge: charge,
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Oooops, error occurred"
        })
    }
}

exports.coinbaseWebhook = async (req, res, next) => {
    try {
        const event = Webhook.verifyEventBody(req.rawBody, req.headers['x-cc-webhook-signature'], process.env.COINBASE_WEBHOOK_SECRET);
        console.log('Successfully verified', event.type);

        if (event.type === "charge:confirmed" || event.type === "charge:resolved") {
            let amount = event.data.pricing.local.amount;
            let userId = event.data.metadata.user_id


            const t = await sequelize.transaction();
            try {
                const user = await User.findByPk(+userId, {transaction: t});
                const [wallet, created] = await Wallet.findOrCreate({
                        where: {
                            UserId: +user.id
                        },
                        defaults: {
                            UserId: +user.id,
                            balance: 0
                        },
                        transaction: t
                });

                const operation = await Transaction.create({
                    type: "deposit",
                    WalletId: +wallet.id,
                    amount: +amount
                }, {transaction: t});

                await wallet.increment({
                    balance: +amount,
                }, {transaction: t});


                t.commit();

                return res.status(200).json({
                    message: "Everything was good"
                })

            } catch (e) {
                console.log(e)
                t.rollback();
                return res.status(500).json({
                    message: "Error occured"
                })
            }
        }
        return res.status(200).json({
            message: "Everything was good"
        })

    } catch(error) {
        console.log('Failed');
        console.log(error);
        return res.status(500).json({
            message: "Everything was good"
        })
    }
}

exports.getBalance = async (req, res, next) => {
    try {
        const {userId} = req.body;
        console.log(userId)
        const wallet = await Wallet.findOne({
            where: {
                UserId: +userId
            }
        })

        if (wallet) {
            return res.status(200).json({
                balance: wallet.balance.toFixed(2)
            })
        }
        return res.status(404).json({
            message: "No wallet was found for this user"
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            message: "Error occured"
        })
    }
}
