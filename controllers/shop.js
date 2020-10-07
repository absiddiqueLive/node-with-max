const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, columnDefinition]) => {
      res.render('shop/product-list', {
        prods: rows, //product rows from database,
        pageTitle: 'All Products',
        path: '/products',
      });
    })
    .catch((error) => console.log(error));
};

exports.getProduct = (req, res, next) => {
  const { productId } = req.params;

  Product.findById(productId)
    .then(([products]) => {
      res.render('shop/product-detail', {
        path: '/products',
        product: products[0],
        pageTitle: 'Detail of ' + products[0].title,
      });
    })
    .catch((error) => console.log(error));
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, columnDefinition]) => {
      res.render('shop/index', {
        prods: rows, //product rows from database,
        pageTitle: 'Shop',
        path: '/',
      });
    })
    .catch((error) => console.log(error));
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
