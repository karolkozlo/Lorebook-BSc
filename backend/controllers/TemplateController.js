import {
    createTemplate,
    updateTemplate,
    findTemplate,
    findUniverseTemplates,
    findTemplatesOfType,
    destroyTemplate,
} from "../services/TemplateService.js";
import { NotFoundException } from "../errors.js";

async function getTemplate(req, res) {
    if (req.params.id === undefined) {
      res.status(400).send({ message: "ID must be defined" });
      return;
    }
    try {
      const template = await findTemplate(req.params.id);
      res.status(200).json(template);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    };
};

async function getUniverseTemplates(req, res) {
    if (req.params.universeID === undefined) {
        res.status(400).send({ message: "universeID must be defined" });
        return;
    }
    try {
      const templates = await findUniverseTemplates(req.params.universeID, parseInt(req.query.limit), parseInt(req.query.offset));
      res.status(200).json(templates);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    };
};

async function getTemplatesOfType(req, res) {
    if (req.params.universeID === undefined) {
        res.status(400).send({ message: "universeID must be defined" });
        return;
    }
    try {
      const templates = await findTemplatesOfType(req.params.universeID, req.params.type);
      res.status(200).json(templates);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    };
};

async function postTemplate(req, res) {
    try {
      const createdTemplate = await createTemplate(
        req.body.name,
        req.body.type,
        req.body.template,
        req.body.universeID
      );
      res.status(201).json(createdTemplate);
    } catch (e) {
      res.status(400).send({ message: e.message });
    };
};

async function deleteTemplate(req, res) {
    try {
      await destroyTemplate(req.params.id);
      res.status(200).send();
    } catch (e) {
      res.status(400).send({ message: e.message });
    };
};

async function patchTemplate(req, res) {
    try {
      const id = req.params.id;
      await updateTemplate(id, req.body);
      res.status(200).send();
    } catch (e) {
      if (e instanceof NotFoundException) {
        res.status(404);
      } else {
        res.status(400);
      }
      res.send({ message: e.message });
    };
  };

export {
    getTemplate,
    getUniverseTemplates,
    getTemplatesOfType,
    postTemplate,
    deleteTemplate,
    patchTemplate
};