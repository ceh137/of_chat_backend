const { Sequelize, DataTypes, Model } = require('sequelize')
const sequelize = require('../utils/db')


class AiMessage extends Model {

}

AiMessage.init({
    // Model attributes are defined here
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    sender_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
    },
    aiConversationId: {
        type: DataTypes.BIGINT,
        allowNull: false,
    }


}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'aiMessage', // We need to choose the model name
    timestamps: true,
    paranoid: true,
} );

module.exports = AiMessage;