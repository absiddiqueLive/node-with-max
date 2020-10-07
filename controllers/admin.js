const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product(null, title, imageUrl, description, price);

  product
    .save()
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error));
};

exports.getEditProduct = (req, res, next) => {
  const { productId } = req.params;

  Product.findById(productId, (product) => {
    if (!product) {
      return res.redirect('/');
    }

    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: true,
      product,
    });
  });
};

exports.postEditProduct = (request, response, next) => {
  const { productId, title, imageUrl, price, description } = request.body;
  const product = new Product(productId, title, imageUrl, description, price);

  product.save();
  response.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products',
    });
  });
};

exports.postDeleteProduct = (request, response, next) => {
  const { productId } = request.body;

  Product.deleteById(productId);
  response.redirect('/admin/products');
};
