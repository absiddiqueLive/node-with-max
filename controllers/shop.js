const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products',
    });
  });
};

exports.getProduct = (req, res, next) => {
  const { productId } = req.params;

  Product.findById(productId, (product) => {
    res.render('shop/product-detail', {
      path: '/products',
      product: product,
      pageTitle: 'Detail of ' + product.title,
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
    });
  });
};

exports.getCart = (request, response, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartItems = [];

      for (product of products) {
        const cartData = cart.products.find((prod) => prod.id === product.id);

        if (cartData) {
          cartItems.push({ product, quantity: cartData.quantity });
        }
      }

      response.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartItems,
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const { productId } = req.body;

  Product.findById(productId, (product) => {
    Cart.addProduct(productId, product.price);
  });

  res.redirect('/cart');
};

exports.postCartRemoveItem = (request, response, next) => {
  const { productId } = request.body;

  Product.findById(productId, (product) => {
    if (product) {
      Cart.deleteProduct(productId, product.price);
    }

    response.redirect('/cart');
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders',
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout',
  });
};
