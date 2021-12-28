const express = require('express');
const router = express.Router();
const recipes = require('../controller/recipe.controller');

router.post('/create', recipes.createRecipe);
router.get('/read', recipes.findAll);
router.get('/search/ing/:ing', recipes.findAllIng);
router.get('/search/:regex', recipes.findAllName);
router.put('/update', recipes.updateRecipe);
router.delete('/delete/:id', recipes.deleteRecipe);

module.exports = router;