import { postCharacter, patchCharacter, getCharacter, getUniverseCharacters, getSearchedCharacters, deleteCharacter }
from "../controllers/CharacterController.js";
import express from "express";

const CharacterRouter = new express.Router();
CharacterRouter.use(express.json());

CharacterRouter.route('/characters').post(postCharacter);
CharacterRouter.route('/characters/:id').get(getCharacter);
CharacterRouter.route('/characters/universe/:universeID').get(getUniverseCharacters);
CharacterRouter.route('/characters/search/:universeID').get(getSearchedCharacters);
CharacterRouter.route('/characters/:id').delete(deleteCharacter);
CharacterRouter.route('/characters/:id').patch(patchCharacter);

export default CharacterRouter;