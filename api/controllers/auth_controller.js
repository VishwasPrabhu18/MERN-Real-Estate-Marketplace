import User from "../modules/user_module.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
    const { userName, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ userName, email, password: hashedPassword });

    try {
        await newUser.save();
        res.status(201).json("User Created Successfully");
    } catch (error) {
        next(error);
    }
}