import express from "express";

import { html } from "./config.js";
import recipes from "./data/recipes.js";

import { getRecipes, getRecipeByID, createRecipe, updateRecipeByID, deleteRecipeByID} from "./models/recipes.js";

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.json());

/** DO NOT CHANGE THIS ROUTE - it serves our front-end */
app.get("/", function (req, res) {
  res.sendFile(html);
});

/** YOUR ROUTES GO HERE */

//GET ALL RECIPES:
//have the path of all recipes
//needs to give back to the user all the recipes 
//we need to check if its worked by using success and payload
app.get("/recipes", function (req,res){
  console.log(req.query)
  res.json({success : true, payload : recipes });


});

// GET A RECIPE BY ID
//have the path to look for recipes followed by a specific id
//the result should be a recipe with that particular id to show up
//this can be done by using get all recipes and adding the ability to search by id
// the response needs to use succes and payload
app.get("/recipes/:id", function( req,res){
  const id = Number(req.params.id);
  const idFound = getRecipeByID(id)
  res.json({success : true, payload : idFound })
})

// CREATE A RECIPE
//we need to use a post method with a path to recipes
//we will be using the body
//our aim is to create a new recipe
//our response will be success payload again
//this will be similar to recipe by id

app.post("/recipes", function (req, res){
  const newRecipe = req.body;
  createRecipe (newRecipe)
  res.json({success : true, payload : newRecipe })
});



// UPDATE A RECIPE BY ID (updateRecipeByID)
//we will be using the put method which will look at a path of recipes/id
//we need to get the id of the one we want to replace
//we need to take in a new recipe
//put will recplace everything within that id to update it
//this will be using the body as well
//our result will be update a recipe
// we will be using success and payload
app.put("/recipes/:id" , function(req,res){
  const id = Number(req.params.id);
  //console.log(req.params.id)
  const updatedRecipe = req.body
  //console.log(req.body)
  const recipeReplacement = updateRecipeByID(id, updatedRecipe)
  //console.log(updateRecipeByID)
  res.json({success : true, payload : recipeReplacement})
});


//DELETE A RECIPE BY ID (deleteRecipeByID)
app.delete("/recipes/:id" , function(req,res){
  const id = Number(req.params.id);
  const deleteRecipe = deleteRecipeByID(id)
  res.json({success : true, payload : deleteRecipe})

})



/** END OF YOUR ROUTES */

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
