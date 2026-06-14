import { postChapter, patchChapter, patchChapterPosition, getChapter, getStoryChapters, getSearchedChapters, deleteChapter }
from "../controllers/ChapterController.js";
import express from "express";

const ChapterRouter = new express.Router();
ChapterRouter.use(express.json());

ChapterRouter.route('/chapters').post(postChapter);
ChapterRouter.route('/chapters/:id').get(getChapter);
ChapterRouter.route('/chapters/story/:storyID').get(getStoryChapters);
ChapterRouter.route('/chapters/search/:storyID').get(getSearchedChapters);
ChapterRouter.route('/chapters/:id').delete(deleteChapter);
ChapterRouter.route('/chapters/:id').patch(patchChapter);
ChapterRouter.route('/chapters/position/:id').patch(patchChapterPosition);

export default ChapterRouter;