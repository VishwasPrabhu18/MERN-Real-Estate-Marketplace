import express from "express";
import { signup } from "../controllers/auth_controller.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);

export default authRouter;