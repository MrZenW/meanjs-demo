'use strict';

/**
 * Module dependencies
 */
var _ = require('lodash'),
  fs = require('fs'),
  path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  mongoose = require('mongoose'),
  multer = require('multer'),
  multerS3 = require('multer-s3'),
  aws = require('aws-sdk'),
  amazonS3URI = require('amazon-s3-uri'),
  config = require(path.resolve('./config/config')),
  Product = mongoose.model('Product'),
  validator = require('validator');


/**
 * Update profile picture
 */
exports.changeProfilePicture = function (req, res) {
  var productId = req.params._id;
  var existingImageUrl;
  var multerConfig;

  multerConfig = config.uploads.product.image;

  // Filtering to upload only images
  multerConfig.fileFilter = require(path.resolve('./config/lib/multer')).imageFileFilter;
// console.log(multerConfig,'multerConfig');
  var upload = multer(multerConfig).single('newProductPicture');

  // productId
  existingImageUrl = '/modules/articles/client/img/product/' + productId + '.png';
  uploadImage()
    .then(updateProduct)
    .then(deleteOldImage)
    .then(function () {
      res.json({});
    })
    .catch(function (err) {
      res.status(422).send(err);
    });


  function uploadImage() {
    return new Promise(function (resolve, reject) {
      upload(req, res, function (uploadError) {
        console.log(uploadError,'uploadError~~~');
        if (uploadError) {
          reject(errorHandler.getErrorMessage(uploadError));
        } else {
          resolve();
        }
      });
    });
  }

  function updateProduct() {
    return new Promise(function (resolve, reject) {
      Product.findOne({ _id: productId }).exec(function (err, product) {
        product.image = '/' + req.file.path;
        product.save(function (err, theuser) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    });
  }

  function deleteOldImage() {
    return new Promise(function (resolve, reject) {

      fs.unlink(path.resolve(existingImageUrl), function (unlinkError) {
        if (unlinkError) {

          // If file didn't exist, no need to reject promise
          if (unlinkError.code === 'ENOENT') {
            console.log('Removing profile image failed because file did not exist.');
            return resolve();
          }

          console.error(unlinkError);

          reject({
            message: 'Error occurred while deleting old profile picture'
          });
        } else {
          resolve();
        }
      });

    });
  }

};
