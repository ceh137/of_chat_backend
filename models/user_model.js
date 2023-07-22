const { Sequelize, DataTypes, Model } = require('sequelize')
const sequelize = require('../utils/db')

class User extends Model {

}

User.init({
    // Model attributes are defined here
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING(),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(),
        allowNull: false,
    },
    verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(),
        allowNull: false,
    },
    API_key: {
        type: DataTypes.STRING()
    }
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'User', // We need to choose the model name
    timestamps: true,
    paranoid: true,
} );

module.exports = User;