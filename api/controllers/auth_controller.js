import User from "../modules/user_module.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";
import dotenv from "dotenv";

dotenv.config();

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
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(404, "User not found"));
        }
        const validPassword = bcrypt.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(401, "Wrong Credentials"));
        }
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: userPassword, ...rest } = validUser._doc;
        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(rest);
    }
    catch (error) {
        next(error);
    }
}