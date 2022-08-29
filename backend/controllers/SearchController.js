import {
    findShortLists,
} from "../services/SearchService.js";

async function getShortLists(req, res) {
    if (req.params.universeID === undefined) {
        res.status(400).send({ message: "universeID must be defined" });
        return;
    }
    try {
        const elements = await findShortLists(req.params.universeID);
        res.status(200).json(elements);
    } catch(err) {
        return res.status(400).json({ message: e.message });
    }
};

export {
    getShortLists
};