const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {
  static addProduct(id, price) {
    fs.readFile(p, (error, content) => {
      let cart = { products: [], totalPrice: 0 };
      if (!error) {
        cart = JSON.parse(content);
      }

      const productIndex = cart.products.findIndex(
        (product) => product.id === id
      );
      const oldProduct = cart.products[productIndex];

      if (typeof oldProduct != 'undefined') {
        cart.products[productIndex] = {
          ...oldProduct,
          quantity: parseInt(oldProduct.quantity) + 1,
        };
      } else {
        cart.products = [...cart.products, { id, quantity: 1 }];
      }

      cart.totalPrice = parseFloat(cart.totalPrice) + parseFloat(price);

      fs.writeFile(p, JSON.stringify(cart), (error) => {
        console.log(error);
      });
    });
  }

  static deleteProduct(productId, price) {
    fs.readFile(p, (error, data) => {
      if (error) {
        return;
      }

      const cartData = { ...JSON.parse(data) };
      const product = cartData.products.find((prod) => prod.id == productId);

      if (!product) {
        return;
      }

      const products = [...cartData.products];

      cartData.products = products.filter((item) => item.id != productId);
      cartData.totalPrice = cartData.totalPrice - product.quantity * price;

      if (cartData.products.length == 0) {
        cartData.totalPrice = 0;
      }

      fs.writeFile(p, JSON.stringify(cartData), (error) => {
        console.log(error);
      });
    });
  }

  static getCart(callback) {
    fs.readFile(p, (error, data) => {
      if (error) {
        callback(null);
      }

      const cart = JSON.parse(data);

      callback(cart);
    });
  }
};
