import express from "express";
import { loginUserController, logoutUserController, refreshTokenController } from "../controllers/LoginController.js";
const LoginRouter = new express.Router();
LoginRouter.use(express.json());

LoginRouter.route("/login").post(loginUserController);
LoginRouter.route("/logout").get(logoutUserController);
LoginRouter.route("/refreshToken").get(refreshTokenController);

export default LoginRouter;
