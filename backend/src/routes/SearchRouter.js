import {
    getShortLists,
    getSearchedElements
}
from '../controllers/SearchController.js';
import express from "express";

const SearchRouter = new express.Router();
SearchRouter.use(express.json());

SearchRouter.route('/search/shortLists/:universeID').get(getShortLists);
SearchRouter.route('/search/:universeID/').get(getSearchedElements);

export default SearchRouter;