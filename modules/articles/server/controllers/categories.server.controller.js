'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Category = mongoose.model('Category'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an article
 */
exports.create = function (req, res) {
  console.log(req.body);
  var category = new Category(req.body);
  // product.user = req.user;
  // category.created = Date.now();
  category.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(category);
    }
  });
};

/**
 * List of Articles
 */
exports.list = function (req, res) {
  Category.find().sort('-created').exec(function (err, categories) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(categories);
    }
  });
};


/**
 * Show the current article
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  // var category = req.category ? req.category.toJSON() : {};
  var categoryId = req.params._id;
  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  // article.isCurrentUserOwner = !!(req.user && article.user && article.user._id.toString() === req.user._id.toString());
  Category.findOne({_id:categoryId}).exec(function (err, category) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(category);
    }
  });
};

/**
 * Update an article
 */
exports.update = function (req, res) {
  var category = req.category;

  category.title = req.body.title;
  category.content = req.body.content;

  category.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(category);
    }
  });
};


/**
 * Delete an article
 */
exports.delete = function (req, res) {
  var category = req.category;

  category.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(category);
    }
  });
};
