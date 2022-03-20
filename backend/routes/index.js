import { Router } from "express";
import UserRouter from "./UserRouter.js";

// define /api/* routers
const mainRouter = new Router();
mainRouter.use(UserRouter);
// define /api router
const apiRouter = new Router();
apiRouter.use("/api", mainRouter);

export default apiRouter;