import { RecipeModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";
const getAllRecipes = async (req, res,) => {
    try {
        // {}==> find all on recipe collections
        const response = await RecipeModel.find({})
        return res.json({ error: false, message: 'success', data: response })
    } catch (err) {
        return res.json({ error: true, message: err.message })
    }
}

const postSaveRecipes = async  (req, res) =>{
    const recipe = new RecipeModel(req.body);
    try {
        const response = await recipe.save()
        return res.json({ error: false, message: 'success', data: response })
    } catch (err) {
        return res.json({ error: true, message: err.message })
    }
}

const putSaveUpdateRecipes = async (req, res) =>{
    const userID = req.userID
    try {
        const recipe = await RecipeModel.findById(req.body.recipeID)
        const user = await UserModel.findById(userID)
        user.savedRecipes.push(recipe);
        await user.save();
        return res.json({ error: false, message: 'success', savedRecipes: user.savedRecipes })
    } catch (err) {
        console.log(err, 'line 32')
        return res.json({ error: true, message: err.message })
    }
}

const getSavedUserRecipes = async (req, res) =>{
    const userID = req.userID
    try {
        const user = await UserModel.findById(userID)
        return res.json({ error: false, message: 'success', savedRecipes: user.savedRecipes })
    } catch (error) {
        return res.json({ error: true, message: err })
    }
}

export const getDetailSavedRecipes = async (req, res)=>{
    const userID = req.userID
    try {
        const user = await UserModel.findById(userID)
        const savedRecipes = await RecipeModel.find({ _id: { $in: user.savedRecipes } })
        return res.json({ savedRecipes })
    } catch (error) {
        return res.json({ error: true, message: err })
    }
}

export {getAllRecipes, postSaveRecipes, putSaveUpdateRecipes, getSavedUserRecipes}