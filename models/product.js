const fs = require('fs');
const path = require('path');
const Cart = require('./cart');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile((products) => {
      const localProducts = [...products];

      if (this.id) {
        const productIndex = products.findIndex(
          (product) => product.id == this.id
        );

        localProducts[productIndex] = this;
      } else {
        this.id = Math.random().toString();
        localProducts.push(this);
      }

      fs.writeFile(p, JSON.stringify(localProducts), (err) => {
        console.log(err);
      });
    });
  }

  static deleteById(id) {
    getProductsFromFile((products) => {
      const product = products.filter((product) => product.id === id);
      const filteredProducts = products.filter((product) => product.id !== id);

      fs.writeFile(JSON.stringify(filteredProducts), (error) => {
        if (!error) {
          Cart.deleteProduct(id, product.price);
        }
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, callback) {
    getProductsFromFile((products) => {
      const product = products.find((product) => product.id === id);
      callback(product);
    });
  }
};
