const mongoose = require('mongoose');
const mongoosePaginate = require("mongoose-paginate-v2");

module.exports = mongoose => {
    const recipeSchema = mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        ingredients: {
            type: String,
            required: true
        }

    });
    recipeSchema.plugin(mongoosePaginate);
    const Recipe = mongoose.model('recipe', recipeSchema);
    return Recipe;
};