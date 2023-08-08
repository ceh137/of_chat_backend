'use strict';
const {
  Model, DataTypes
} = require('sequelize');
const sequelize = require("../utils/db");
  class Wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

  }
  Wallet.init({
    balance: {
      type: DataTypes.FLOAT,
      default: 0
    },
    UserId: DataTypes.BIGINT
  }, {
    sequelize,
    paranoid: true,
    timestamps: true,
    modelName: 'Wallet',
  });

  module.exports = Wallet