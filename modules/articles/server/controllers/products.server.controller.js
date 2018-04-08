'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Product = mongoose.model('Product'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an article
 */
exports.create = function (req, res) {
  console.log(req.body, 'products.server.controller');
  var product = new Product(req.body);
  // product.user = req.user;

  product.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(product);
    }
  });
};

/**
 * List of Articles
 */
exports.list = function (req, res) {
  Product.find().sort('-created').populate('category', 'categoryName').exec(function (err, products) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(products);
    }
  });
};


/**
 * Show the current article
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  // var product = req.product ? req.product.toJSON() : {};
  var productId = req.params._id;
  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  // article.isCurrentUserOwner = !!(req.user && article.user && article.user._id.toString() === req.user._id.toString());
  Product.findOne({ _id: productId }).populate('category', 'categoryName').exec(function (err, product) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(product);
    }
  });
};

/**
 * Update an article
 */
exports.update = function (req, res) {
  // var product = req.product;
  let _id = req.body._id;
  Product.findOne({_id: _id }).then(function (product) {
    req.body.updated = Date.now();
    Object.assign(product, req.body);
    product.save(function (err) {
      if (err) {
        return res.status(422).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(product);
      }
    });

  });
};


/**
 * Delete an article
 */
exports.delete = function (req, res) {
  let _id = req.params._id;
  Product.findOne({_id: _id }).then(function (product) {
    product.remove(function (err) {
      if (err) {
        return res.status(422).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(product);
      }
    });
  });
};
