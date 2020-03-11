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
};
