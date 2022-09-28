import {
    findShortLists,
    findSearchedElements
} from "../services/SearchService.js";
import { findUniverseCategories } from "../services/CategoryService.js";
import { hardcodedTablesArray } from '../domainTypes.js';

async function getShortLists(req, res) {
    if (req.params.universeID === undefined) {
        res.status(400).send({ message: "universeID must be defined" });
        return;
    }
    try {
        const elements = await findShortLists(req.params.universeID);
        res.status(200).json(elements);
    } catch(err) {
        return res.status(400).json({ message: err.message });
    }
};

async function getSearchedElements(req, res) {
    try {
        const universeID = req.params.universeID;
        const q = req.query.q;
        let categories = [];
        if ( req.query.categories ) {
            categories = req.query.categories instanceof Array ? req.query.categories : [req.query.categories];
        } else {
            let customCategories = await findUniverseCategories(universeID);
            customCategories = customCategories.map(cat => (cat.id));
            categories = [...hardcodedTablesArray, ...customCategories];
        }
        let tags = [];
        if (req.query.tags) {
            tags = req.query.tags instanceof Array ? req.query.tags : [req.query.tags];
        }
        const limit = req.query.limit;
        const offset = req.query.offset;
        const result = await findSearchedElements(universeID, q, categories, tags, limit, offset)
        res.status(200).json(result);
    } catch (e) {
        return res.status(400).json({ message: e.message });
    }
};

export {
    getShortLists,
    getSearchedElements
};