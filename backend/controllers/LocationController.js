import {
    createLocation,
    findLocation,
    findUniverseLocations,
    searchLocations,
    updateLocation,
    destroyLocation,
} from "../services/LocationService.js";
import { NotFoundException } from "../errors.js";

async function getLocation(req, res) {
    if (req.params.id === undefined)
      res.status(400).send({ message: "ID must be defined" });
    try {
      const location = await findLocation(req.params.id);
      res.status(200).json(location);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
}

async function getUniverseLocations(req, res) {
    if (req.params.universeID === undefined) {
        res.status(400).send({ message: "universeID must be defined" });
    }
    try {
      const locations = await findUniverseLocations(req.params.universeID, parseInt(req.query.limit), parseInt(req.query.offset));
      res.status(200).json(locations);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
}

async function getSearchedLocations(req, res) {
    if (req.params.universeID === undefined) {
        res.status(400).send({ message: "universeID must be defined" });
    }
    try {
      let q = req.query.q;
      let limit = parseInt(req.query.limit);
      let offset = parseInt(req.query.offset);
      const locations = await searchLocations(req.params.universeID, q, limit, offset);
      res.status(200).json(locations);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
}

async function postLocation(req, res) {
    try {
        let parentLocation = req.body.locationID ? req.body.locationID : null;
      const createdLocation = await createLocation(
        req.body.name,
        req.body.description,
        req.body.universeID,
        parentLocation
      );
      res.status(201).json(createdLocation);
    } catch (e) {
      res.status(400).send({ message: e.message });
    }
}

async function deleteLocation(req, res) {
    try {
      await destroyLocation(req.params.id);
      res.status(200).send();
    } catch (e) {
      res.status(400).send({ message: e.message });
    }
}

async function patchLocation(req, res) {
    try {
      const id = req.params.id;
      await updateLocation(id, req.body);
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

  export { getLocation, getUniverseLocations, getSearchedLocations, postLocation, deleteLocation, patchLocation };