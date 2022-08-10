import {
    postCategory,
    patchCategory,
    getCategory,
    getUniverseCategories,
    getUniverseCategoryList,
    deleteCategory
}
from "../controllers/CategoryController.js";
import express from "express";

const CategoryRouter = new express.Router();
CategoryRouter.use(express.json());

CategoryRouter.route('/categories').post(postCategory);
CategoryRouter.route('/categories/:id').get(getCategory);
CategoryRouter.route('/categories/universe/:universeID').get(getUniverseCategories);
CategoryRouter.route('/categories/universe/:universeID/list').get(getUniverseCategoryList);
CategoryRouter.route('/categories/:id').delete(deleteCategory);
CategoryRouter.route('/categories/:id').patch(patchCategory);

export default CategoryRouter;