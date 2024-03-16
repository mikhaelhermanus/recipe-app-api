import { RecipeModel } from "../models/Recipes.js";
import express from "express"
import mongoose from "mongoose"
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./users.js";
import { getAllRecipes, getDetailSavedRecipes, getSavedUserRecipes, postSaveRecipes, putSaveUpdateRecipes } from "../controller/recipe.js";
const router = express.Router();

router.get("/", getAllRecipes)

router.post("/saved", verifyToken, postSaveRecipes)

router.put("/update", verifyToken, putSaveUpdateRecipes)

router.get("/savedRecipes", getSavedUserRecipes)

router.get("/savedRecipes/", getDetailSavedRecipes)

export { router as recipeRouter }