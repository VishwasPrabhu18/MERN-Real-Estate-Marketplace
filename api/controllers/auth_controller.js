import User from "../modules/user_module.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    const { userName, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ userName, email, password: hashedPassword });

    try {
        await newUser.save();
        res.status(201).json("User Created Successfully");
    } catch (error) {
        res.status(500).json(error);
    }
}