import { getLocation,
    getUniverseLocations,
    getChildLocations,
    getAncestorLocations,
    getSearchedLocations,
    postLocation,
    deleteLocation,
    patchLocation
}
from "../controllers/LocationController.js";
import express from "express";

const LocationRouter = new express.Router();
LocationRouter.use(express.json());

LocationRouter.route('/locations').post(postLocation);
LocationRouter.route('/locations/:id').get(getLocation);
LocationRouter.route('/locations/universe/:universeID').get(getUniverseLocations);
LocationRouter.route('/locations/children/:id').get(getChildLocations);
LocationRouter.route('/locations/ancestors/:id').get(getAncestorLocations);
LocationRouter.route('/locations/search/:universeID').get(getSearchedLocations);
LocationRouter.route('/locations/:id').delete(deleteLocation);
LocationRouter.route('/locations/:id').patch(patchLocation);

export default LocationRouter;