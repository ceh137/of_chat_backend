'use strict';
const {
  Model,
    DataTypes
} = require('sequelize');
const sequelize = require("../utils/db");
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

  }
  Transaction.init({
    amount: {
      type:DataTypes.FLOAT,
      allowNull: false
    },
    type: DataTypes.ENUM('deposit', 'withdrawal'),
    WalletId: {
      allowNull: false,
      type: DataTypes.BIGINT
    },
  }, {
    sequelize,
    paranoid: true,
    timestamps: true,
    modelName: 'Transaction',
  });


module.exports = Transaction