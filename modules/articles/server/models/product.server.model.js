'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Article Schema
 */
var ProductSchema = new Schema({
  productName: {
    type: String,
    index: true,
    required: 'Please fill in a product name',
    // validate: [validateUsername, 'Please enter a valid username: 3+ characters long, non restricted word, characters "_-.", no consecutive dots, does not begin or end with dots, letters a-z and numbers 0-9.'],
    lowercase: true,
    trim: true
  },
  category: [
    // type: [Schema.Types.ObjectId]
    {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    }
  ],
  description: {
    type: String
  },
  image: {
    type: String,
    default: '/modules/articles/client/img/product/uploads/default'
  },
  price: {
    type: Number
  },
  stockQuantity: {
    type: Number,
    default: 0
  },
  updated: {
    type: Number,
    default: 0
  },
  created: {
    type: Number,
    default: Date.now
  }
});

// ProductSchema.statics.seed = seed;

mongoose.model('Product', ProductSchema);
