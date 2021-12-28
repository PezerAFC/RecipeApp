const db = require("../models");
const Recipe = db.recipes;

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
    return {
        limit,
        offset
    };
};
const findAll = (req, res) => {
    const {
        page,
        size,
    } = req.query;
    const {
        limit,
        offset
    } = getPagination(page, size);

    Recipe.paginate({}, {
            offset,
            limit
        })
        .then((data) => {
            let results = {
                totalItems: data.totalDocs,
                recipes: data.docs,
                totalPages: data.totalPages,
                currentPage: data.page - 1,
            }
            res.status(200).send(results);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message
            });
        });
};

const updateRecipe = (req, res) => {
    Recipe.findById(req.body._id, (err, recipe) => {
        if (err)
            res.status(500).json({
                errmsg: err.message
            });
        recipe.name = req.body.name;
        recipe.description = req.body.description;
        recipe.ingredients = req.body.ingredients;
        recipe.save((err, recipe) => {
            if (err)
                res.status(500).json({
                    errmsg: err.message
                });
            res.status(200).json(
                recipe
            );
        });
    });
}

const createRecipe = (req, res) => {
    let newRecipe = new Recipe({
        name: req.body.name,
        description: req.body.description,
        ingredients: req.body.ingredients
    });
    newRecipe.save((err, recipe) => {
        if (err)
            res.status(500).json({
                errmsg: err.message
            });
        res.status(200).json(
            recipe
        );
    });

};

const deleteRecipe = (req, res) => {
    Recipe.findOneAndRemove({
        _id: req.params.id
    }, (err, recipe) => {
        if (err)
            res.status(500).json({
                errmsg: err.message
            });
        res.status(200).json(
            recipe
        );
    })
};

const findAllName = (req, res) => {
    regex = req.params.regex
    Recipe.find({
        name: {
            "$regex": regex,
            "$options": "i"
        }
    }).sort({
        _id: -1
    }).exec((err, recipes) => {
        if (err) {
            console.log(err.message);
        } else {
            res.status(200).json(recipes);
        }
    });
};

const findAllIng = (req, res) => {
    ing = req.params.ing
    Recipe.find({
        ingredients: {
            "$regex": ing,
            "$options": "i"
        }
    }).sort({
        _id: -1
    }).exec((err, recipes) => {
        if (err) {
            console.log(err.message);
        } else {
            res.status(200).json(recipes);
        }
    });
};

module.exports = {
    findAll,
    findAllIng,
    findAllName,
    createRecipe,
    updateRecipe,
    deleteRecipe
};