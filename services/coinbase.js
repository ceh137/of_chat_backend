const  coinbase = require('coinbase-commerce-node');
const {toInt} = require("validator");
const Client = coinbase.Client;
const resources = coinbase.resources
const clientObj = Client.init(process.env.COINBASE_API_KEY);

exports.createCharge = async (amount, user) => {
    return await resources.Charge.create({
        'name': 'Balance Top-up',
        'description': 'Top up your balance',
        'pricing_type': 'fixed_price',
        'local_price': {
            'amount': +amount,
            'currency': 'USD'
        },
        'requested_info': ['email'],
        metadata: {
            user_id: user.id
        }
    })
}