'use strict';

/**
 * Module dependencies
 */
var articlesPolicy = require('../policies/articles.server.policy'),
  articles = require('../controllers/articles.server.controller'),
  products = require('../controllers/products.server.controller'),
  productsPicture = require('../controllers/products-picture.server.controller'),
  categories = require('../controllers/categories.server.controller');

module.exports = function (app) {
  // Articles collection routes
  app.route('/api/articles').all(articlesPolicy.isAllowed)
    .get(articles.list)
    .post(articles.create);

  // Single article routes
  app.route('/api/articles/:articleId').all(articlesPolicy.isAllowed)
    .get(articles.read)
    .put(articles.update)
    .delete(articles.delete);


  app.route('/api/products/:_id')
    .get(products.read)
    .put(products.update)
    .delete(products.delete);

  app.route('/api/products')// .all(articlesPolicy.isAllowed)
    .get(products.list)
    .post(products.create);

  app.route('/api/products/picture/:_id').post(productsPicture.changeProfilePicture);

  app.route('/api/categories')// .all(articlesPolicy.isAllowed)
    .get(categories.list)
    .put(categories.update)
    .post(categories.create)
    .delete(categories.delete);


  // Finish by binding the article middleware
  app.param('articleId', articles.articleByID);
};
