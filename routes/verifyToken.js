const jwt = require("jsonwebtoken");
const Recipe = require("../models/recipe");

const virifyToken = (req, res, next) => {
  const authHeaders = req.headers.token;
  if (authHeaders) {
    const token = authHeaders.split(" ")[1];
    jwt.verify(token, process.env.jwtSEC, (err, user) => {
      if (err) return res.status(401).json("token is not valid");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("you are not authorized");
  }
};

const virifyTokenAndAuth = (req, res, next) => {
  virifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("You are not allowed!");
    }
  });
};

const virifyTokenAndAuthAdmin = (req, res, next) => {
  virifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed!");
    }
  });
};

//token virify for CRUD OPERATION ON THE RECIPE
const virifyRecipeCrudAndAuth = (req, res, next) => {
  virifyToken(req, res, () => {
    const recipeId = req.params.id;
    const userId = req.user.id;

    Recipe.findById(recipeId)
      .exec()
      .then((recipe) => {
        if (!recipe) return res.status(403).json("recipe data not found");
        if (userId === recipe.createdById || req.user.isAdmin) {
          req.recipe = recipe;
          next();
        } else {
          return res.status(401).json("You are not allowed!");
        }
      });
  });
};

module.exports = {
  virifyToken,
  virifyTokenAndAuth,
  virifyTokenAndAuthAdmin,
  virifyRecipeCrudAndAuth,
};
