import express from "express"
import cors from 'cors'
import {userRouter} from './routes/users.js'
import connectDB from './config/db.js'
import 'dotenv/config'
import { recipeRouter } from "./routes/recipes.js"
const app = express()

app.use(express.json());
app.use(cors());

//routers
app.use("/auth", userRouter);
app.use("/recipes", recipeRouter)
connectDB()
const PORT =  process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server started on PORT:${PORT}`)
})
