const Sequeliz = require('sequelize');

const sequeliz = require('../util/database');

const Cart = sequeliz.define('cart', {
    id: {
        type: Sequeliz.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }
});

module.exports = Cart;
