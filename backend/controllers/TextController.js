import {
    createText,
    findText,
    findContentTexts,
    updateText,
    destroyText,
} from "../services/TextService.js";
import { NotFoundException } from "../errors.js";
import { insertIDintoConfig } from "../services/utils.js";
import { updateContentConfig } from "../services/ContentService.js";

async function getText(req, res) {
    if (req.params.id === undefined) {
      res.status(400).send({ message: "ID must be defined" });
      return;
    }
    try {
      const text = await findText(req.params.id);
      res.status(200).json(text);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
}

async function getContentTexts(req, res) {
    if (req.params.contentID === undefined) {
        res.status(400).send({ message: "contentID must be defined" });
        return;
    }
    try {
      const texts = await findContentTexts(req.params.contentID);
      res.status(200).json(texts);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
}

async function postText(req, res) {
    try {
      const createdText = await createText(
        req.body.title,
        req.body.text,
        req.body.contentID
      );
      const newConfig = insertIDintoConfig(req.body.config, createdText.id);
      await updateContentConfig(newConfig, req.body.contentID);
      res.status(201).json(createdText);
    } catch (e) {
      res.status(400).send({ message: e.message });
    }
}

async function deleteText(req, res) {
    try {
      await destroyText(req.params.id, req.params.contentID);
      res.status(200).send();
    } catch (e) {
      res.status(400).send({ message: e.message });
    }
}

async function patchText(req, res) {
    try {
      const id = req.params.id;
      await updateText(id, req.body, req.params.contentID);
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

  export { getText, getContentTexts, postText, deleteText, patchText };