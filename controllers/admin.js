const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;

  req.user.createProduct({
    title,
    price,
    description,
    imageUrl
  }).then(() => res.redirect('/admin/products')).catch((error) => console.log(error));
};

exports.getEditProduct = (req, res, next) => {
  const { productId } = req.params;

  console.log(productId, req.params);

  // Product.findByPk(productId);
  req.user.getProducts({ where: { id: productId } }).then((products) => {
    const product = products[0];

    if (!product) {
      return res.redirect('/');
    }

    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: true,
      product
    });
  }).catch((error) => console.log(error));
};

exports.postEditProduct = (request, response, next) => {
  const { productId, title, imageUrl, price, description } = request.body;

  Product.findByPk(productId).then((product) => {
    product.title = title;
    product.price = price;
    product.imageUrl = imageUrl;
    product.description = description;
    return product.save();
  }).then((result) => {
    console.log('Product Updated');
    response.redirect('/admin/products');
  }).catch((error) => console.log(error));
};

exports.getProducts = (req, res, next) => {
  req.user.getProducts().then((products) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  }).catch((error) => console.log(error));
};

exports.postDeleteProduct = (request, response, next) => {
  const { productId } = request.body;

  Product.findByPk(productId).then((product) => product.destroy()).then((result) => {
    console.log('Product Destroyed');
    response.redirect('/admin/products');
  }).catch((error) => console.log(error));
};
