import { Router } from "express";
import UserRouter from "./UserRouter.js";
import UniverseRouter from "./UniverseRouter.js";

// define /api/* routers
const mainRouter = new Router();
mainRouter.use(UserRouter);
mainRouter.use(UniverseRouter);
// define /api router
const apiRouter = new Router();
apiRouter.use("/api", mainRouter);

export default apiRouter;