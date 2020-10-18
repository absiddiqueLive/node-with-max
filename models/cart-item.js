const Sequeliz = require('sequelize');

const sequeliz = require('../util/database');

const CartItem = sequeliz.define('cartItem', {
  id: {
    type: Sequeliz.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  quantity: {
    type: Sequeliz.INTEGER,
    allowNull: false
  }
});

module.exports = CartItem;
