import { Router } from "express";
import UserRouter from "./UserRouter.js";
import UniverseRouter from "./UniverseRouter.js";
import CharacterRouter from "./CharacterRouter.js";
import RelationRouter from "./RelationRouter.js";
import LocationRouter from "./LocationRouter.js";
import CategoryRouter from "./CategoryRouter.js";
import EntryRouter from "./EntryRouter.js";
import TimelineRouter from "./TimelineRouter.js";
import EventRouter from "./EventRouter.js";

// define /api/* routers
const mainRouter = new Router();
mainRouter.use(UserRouter);
mainRouter.use(UniverseRouter);
mainRouter.use(CharacterRouter);
mainRouter.use(RelationRouter);
mainRouter.use(LocationRouter);
mainRouter.use(CategoryRouter);
mainRouter.use(EntryRouter);
mainRouter.use(TimelineRouter);
mainRouter.use(EventRouter);
// define /api router
const apiRouter = new Router();
apiRouter.use("/api", mainRouter);

export default apiRouter;