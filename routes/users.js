import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { UserModel } from '../models/Users.js';

const router = express.Router()

router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username })
    if (user) {
        return res.json({ message: "User Already Exist" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new UserModel({ username, password: hashedPassword });

    await newUser.save()
    res.json({ Message: "User Registered Successfully" });
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body
    const user = await UserModel.findOne({ username });

    if (!user) {
        return res.json({ message: "User Not Exist" })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.json({ message: "Username or Password is Invalid" })
    }

    const token = jwt.sign({ id: user._id }, "secret");
    res.json({ token, userId: user._id })
});

export { router as userRouter }

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    // const token = 'asd'
    if (token) {
        jwt.verify(token, "secret", (err, decoded) => {
            if (err) return res.json({ error: true, message: 'Token not valid', status: 403 })
            else {
                const userID = decoded.id
                if (userID) {
                    console.log(userID, 'line 52')
                    req.userID = userID
                } else {
                    return res.json({ error: true, message: 'Token not valid', status: 403 })
                }
                next();
            }
        });
    } else {
        return res.json({ error: true, message: 'Unauthorized', status: 403 })
    }
}