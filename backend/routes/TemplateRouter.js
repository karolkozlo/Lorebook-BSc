import {
    getTemplate,
    getUniverseTemplates,
    getTemplatesOfType,
    postTemplate,
    deleteTemplate,
    patchTemplate
}
from "../controllers/TemplateController.js";
import express from "express";

const TemplateRouter = new express.Router();
TemplateRouter.use(express.json());

TemplateRouter.route('/templates').post(postTemplate);
TemplateRouter.route('/templates/:id').get(getTemplate);
TemplateRouter.route('/templates/universe/:universeID').get(getUniverseTemplates);
TemplateRouter.route('/templates/universe/:universeID/type/:type').get(getTemplatesOfType);
TemplateRouter.route('/templates/:id').delete(deleteTemplate);
TemplateRouter.route('/templates/:id').patch(patchTemplate);

export default TemplateRouter;