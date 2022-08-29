import {
    getShortLists,
}
from '../controllers/SearchController.js';
import express from "express";

const SearchRouter = new express.Router();
SearchRouter.use(express.json());

SearchRouter.route('/search/shortLists/:universeID').get(getShortLists);

export default SearchRouter;