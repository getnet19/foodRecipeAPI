const router = require("express").Router();
const recipe = require("../models/recipe");
const { virifyRecipeCrudAndAuth } = require("./verifyToken");

//ADD NEW RECIPE
router.post("/create", async (req, res) => {
  const newRecipe = new recipe(req.body);
  try {
    const savedRecipe = await newRecipe.save();
    res.status(200).json(savedRecipe);
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATE RECIPE id is value of recipe
router.put("/update/:id", virifyRecipeCrudAndAuth, async (req, res) => {
  try {
    const updateRecipe = await recipe.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateRecipe);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE RECEPE
router.delete("/delete/:id", virifyRecipeCrudAndAuth, async (req, res) => {
  try {
    await recipe.findByIdAndDelete(req.params.id);
    res.status(200).json("recipe successfully deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET one recipe data
router.get("find/:id", virifyRecipeCrudAndAuth, async (req, res) => {
  try {
    const singleRecipe = await recipe.findOne(req.params.id);
    if (!singleRecipe) {
      return res.status(400).json("data not avilable");
    }
    res.status(200).json(singleRecipe);
  } catch (error) {
    res.status(500).json(error);
  }
});

//search and filter/browse
// ● user be able to search using: -
// ● recipes title
// ● recipes ingredients
// ● recipes cookingHour

//● user be able to filter/browse using: -
// ● categories set to recipes
// ● recipes ingredients
// ● recipes cookingHour

router.get("/find", async (req, res) => {
  const { category, cookingHour, search, ingredinet } = req.query;
  let query = {};
  if (category) {
    query["cathegory.name"] = { $in: [category] };
  } else if (cookingHour) {
    query.cookingHour = cookingHour;
  } else if (ingredinet) {
    query["ingridents.ingridentsTitle"] = { $in: [ingredinet] };
  } else if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { "ingridents.ingridentsTitle": { $regex: search, $options: "i" } },
      { cookingHour: { $regex: search, $options: "i" } },
    ];
  }

  try {
    let recipes;
    if (query) {
      recipes = await recipe.find(query);
    } else {
      recipes = await recipe.find();
    }
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
