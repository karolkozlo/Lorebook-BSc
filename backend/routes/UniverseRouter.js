import {
    postUniverse,
    patchUniverse,
    getUniverse,
    getUserUniverses,
    getUserUniverseList,
    deleteUniverse
} from "../controllers/UniverseController.js";
import express from "express";

const UniverseRouter = new express.Router();
UniverseRouter.use(express.json());

UniverseRouter.route('/universes').post(postUniverse);
UniverseRouter.route('/universes/:id').get(getUniverse);
UniverseRouter.route('/universes/user/:userID').get(getUserUniverses);
UniverseRouter.route('/universes/user/list/:userID').get(getUserUniverseList);
UniverseRouter.route('/universes/:id').delete(deleteUniverse);
UniverseRouter.route('/universes/:id').patch(patchUniverse);

export default UniverseRouter;