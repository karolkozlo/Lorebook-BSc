import {
    createCategory,
    findCategory,
    findUniverseCategories,
    findUniverseCategoryList,
    updateCategory,
    destroyCategory,
} from "../services/CategoryService.js";
import { NotFoundException } from "../errors.js";

async function getCategory(req, res) {
    if (req.params.id === undefined)
      res.status(400).send({ message: "ID must be defined" });
    try {
      const category = await findCategory(req.params.id);
      res.status(200).json(category);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
}

async function getUniverseCategories(req, res) {
    if (req.params.universeID === undefined) {
        res.status(400).send({ message: "universeID must be defined" });
    }
    try {
      const categories = await findUniverseCategories(req.params.universeID);
      res.status(200).json(categories);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
}

async function getUniverseCategoryList(req, res) {
  if (req.params.universeID === undefined) {
      res.status(400).send({ message: "universeID must be defined" });
  }
  try {
    const categoryList = await findUniverseCategoryList(req.params.universeID);
    res.status(200).json(categoryList);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
}

async function postCategory(req, res) {
    try {
      const createdCategory = await createCategory(
        req.body.name,
        req.body.universeID
      );
      res.status(201).json(createdCategory);
    } catch (e) {
      res.status(400).send({ message: e.message });
    }
}

async function deleteCategory(req, res) {
    try {
      await destroyCategory(req.params.id);
      res.status(200).send();
    } catch (e) {
      res.status(400).send({ message: e.message });
    }
}

async function patchCategory(req, res) {
    try {
      const id = req.params.id;
      await updateCategory(id, req.body.name);
      res.status(200).send();
    } catch (e) {
      if (e instanceof NotFoundException) {
        res.status(404);
      } else {
        res.status(400);
      }
      res.send({ message: e.message });
    }
  }

  export {
    getCategory,
    getUniverseCategories,
    getUniverseCategoryList,
    postCategory,
    deleteCategory,
    patchCategory
  };