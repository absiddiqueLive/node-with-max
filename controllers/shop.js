'use strict';

const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch((error) => console.log(error));
};

exports.getProduct = (req, res, next) => {
  const { productId } = req.params;

  Product.findByPk(productId)
    .then((product) => {
      res.render('shop/product-detail', {
        path: '/products',
        product: product,
        pageTitle: 'Detail of ' + product.title
      });
    })
    .catch((error) => console.log(error));
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch((error) => console.log(error));
};

exports.getCart = async (request, response, next) => {
  await request.user
    .getCart()
    .then((cart) => {
      if (cart) {
        return cart
          .getProducts()
          .catch((error) => console.log(error));
      }
      return [];
    })
    .then(products => {
      response.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      });
    })
    .catch(error => console.log(error));
};

exports.postCart = async (req, res, next) => {
  const { productId } = req.body;

  let newQuantity = 1;
  let cart = await req.user
    .getCart()
    .then(cart => cart)
    .catch(error => { console.log(error); return null; });

  if (!cart) {
    cart = await req.user.createCart();
  }

  cart
    .getProducts({ where: { id: productId } })
    .then(products => {
      let product;

      if (products.length > 0) {
        product = products[0];
        newQuantity += product.cartItem.quantity;
        return product;
      }

      return Product.findByPk(productId);
    })
    .then(product => {
      return cart.addProduct(product, { through: { quantity: newQuantity } });
    })
    .then(() => res.redirect('/cart'))
    .catch(error => console.log(error));
};

exports.postCartRemoveItem = (request, response, next) => {
  const { productId } = request.body;

  request.user
    .getCart()
    .then(cart => {
      if (cart) {
        return cart.getProducts({ where: { id: productId } });
      }
    })
    .then(products => {
      if (products.length > 0) {
        const product = products[0];

        product.cartItem.destroy();
      }
    })
    .then(() => response.redirect('/cart'))
    .catch(error => console.log(error));
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
