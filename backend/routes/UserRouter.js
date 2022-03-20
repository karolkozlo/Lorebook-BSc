import { postUser, patchUser, deleteUser, getUser } from '../controllers/UserController.js';
import express from "express";

const UserRouter = new express.Router();
UserRouter.use(express.json());

UserRouter.route('/users').post(postUser);
UserRouter.route('/users/:email').get(getUser);
UserRouter.route('/users/:email').delete(deleteUser);
UserRouter.route('/users/:email').patch(patchUser);

export default UserRouter;