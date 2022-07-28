import express from "express";
import loginController from "../controllers/LoginController.js";
const LoginRouter = new express.Router();
LoginRouter.use(express.json());

LoginRouter.route("/login").post(loginController);

export default LoginRouter;
