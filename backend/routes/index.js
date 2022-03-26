import { Router } from "express";
import UserRouter from "./UserRouter.js";
import UniverseRouter from "./UniverseRouter.js";
import CharacterRouter from "./CharacterRouter.js";

// define /api/* routers
const mainRouter = new Router();
mainRouter.use(UserRouter);
mainRouter.use(UniverseRouter);
mainRouter.use(CharacterRouter);
// define /api router
const apiRouter = new Router();
apiRouter.use("/api", mainRouter);

export default apiRouter;