'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Article Schema
 */
var CategorySchema = new Schema({
  categoryName: {
    type: String,
    index: {
      unique: 'This category name already exists'
    },
    required: 'Please fill in a category name',
    // validate: [validateUsername, 'Please enter a valid username: 3+ characters long, non restricted word, characters "_-.", no consecutive dots, does not begin or end with dots, letters a-z and numbers 0-9.'],
    lowercase: true,
    trim: true
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

mongoose.model('Category', CategorySchema);
