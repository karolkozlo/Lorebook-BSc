import { postUser, patchUser, deleteUser, getUser } from '../controllers/UserController.js';
import express from "express";

const UserRouter = new express.Router();
UserRouter.use(express.json());

UserRouter.route('/users').post(postUser);
UserRouter.route('/users/:id').get(getUser);
UserRouter.route('/users/:id').delete(deleteUser);
UserRouter.route('/users/:id').patch(patchUser);

export default UserRouter;