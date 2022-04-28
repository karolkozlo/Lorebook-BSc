import { Router } from "express";
import UserRouter from "./UserRouter.js";
import UniverseRouter from "./UniverseRouter.js";
import StoryRouter from "./StoryRouter.js";
import CharacterRouter from "./CharacterRouter.js";
import RelationRouter from "./RelationRouter.js";
import LocationRouter from "./LocationRouter.js";
import CategoryRouter from "./CategoryRouter.js";
import EntryRouter from "./EntryRouter.js";
import TimelineRouter from "./TimelineRouter.js";
import EventRouter from "./EventRouter.js";
import TagRouter from "./TagRouter.js";
import TextRouter from "./TextRouter.js";
import ListRouter from "./ListRouter.js";
import ListItemRouter from "./ListItemRouter.js";
import ChapterRouter from "./ChapterRouter.js";
import LinkGroupRouter from "./LinkGroupRouter.js";

// define /api/* routers
const mainRouter = new Router();
mainRouter.use(UserRouter);
mainRouter.use(UniverseRouter);
mainRouter.use(StoryRouter);
mainRouter.use(CharacterRouter);
mainRouter.use(RelationRouter);
mainRouter.use(LocationRouter);
mainRouter.use(CategoryRouter);
mainRouter.use(EntryRouter);
mainRouter.use(TimelineRouter);
mainRouter.use(EventRouter);
mainRouter.use(TextRouter);
mainRouter.use(ListRouter);
mainRouter.use(ListItemRouter);
mainRouter.use(TagRouter);
mainRouter.use(ChapterRouter);
mainRouter.use(LinkGroupRouter);
// define /api router
const apiRouter = new Router();
apiRouter.use("/api", mainRouter);

export default apiRouter;