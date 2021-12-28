const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
const dbConfig = require('../config/db.config');

mongoose.Promise = global.Promise;

const db = {
    mongoose: mongoose,
    url: dbConfig.url,
    recipes: require('./recipe.model')(mongoose, mongoosePaginate),
};

module.exports = db;