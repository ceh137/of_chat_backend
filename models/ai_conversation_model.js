const { Sequelize, DataTypes, Model } = require('sequelize')
const sequelize = require('../utils/db')


class AiConversation extends Model {

}

AiConversation.init({
    // Model attributes are defined here
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    onlyFansId: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    onlyFansSenderId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    UserId: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },



}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'aiConversation', // We need to choose the model name
    timestamps: true,
    paranoid: true,
} );

module.exports = AiConversation;