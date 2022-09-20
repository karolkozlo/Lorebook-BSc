import LbAPI from "./LbAPI.js";
import { NotFoundException } from '@/domain/errors.js';

async function getLocation(id) {
    return await LbAPI
        .get(`/locations/${id}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            if (error.response && error.response.data.message) {
                if (error.response.status == 404) {
                    throw new NotFoundException(`${error.response.data.message}`);
                }
                throw new Error(`${error.response.data.message}`);
            } else if (error.request) {
                throw new Error("Service refused connection");
            } else {
                throw new Error("Undefined error");
            }
        });
};

async function updateLocation(id, fields) {
    return await LbAPI
        .patch(`/locations/${id}`, fields)
        .then(() => {
            return true;
        })
        .catch((error) => {
            if (error.response && error.response.data.message) {
                const err = new Error(`${error.response.data.message}`);
                throw err;
            } else if (error.request) {
                throw new Error("Service refused connection");
            } else {
                throw new Error("Undefined error");
            }
        });
};

async function createLocation(name, description, universeID, parentLocation) {
    return await LbAPI
        .post(`/locations`, {name, description, universeID, locationID: parentLocation})
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            if (error.response && error.response.data.message) {
                const err = new Error(`${error.response.data.message}`);
                throw err;
            } else if (error.request) {
                throw new Error("Service refused connection");
            } else {
                throw new Error("Undefined error");
            }
        });
};

async function getUniverseLocations(universeID) {
    return await LbAPI
        .get(`/locations/universe/${universeID}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            if (error.response && error.response.data.message) {
                const err = new Error(`${error.response.data.message}`);
                throw err;
            } else if (error.request) {
                throw new Error("Service refused connection");
            } else {
                throw new Error("Undefined error");
            }
        });
};

async function searchLocations(universeID, query, limit, offset) {
    const encodedQuery = encodeURIComponent(query);
    return await LbAPI
        .get(`/locations/search/${universeID}?q=${encodedQuery}&limit=${limit}&offset=${offset}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            if (error.response && error.response.data.message) {
                const err = new Error(`${error.response.data.message}`);
                throw err;
            } else if (error.request) {
                throw new Error("Service refused connection");
            } else {
                throw new Error("Undefined error");
            }
        });
}

async function deleteLocation(locationID) {
    return await LbAPI
        .delete(`/locations/${locationID}`)
        .then(() => {
            return true;
        })
        .catch((error) => {
            if (error.response && error.response.data.message) {
                const err = new Error(`${error.response.data.message}`);
                throw err;
            } else if (error.request) {
                throw new Error("Service refused connection");
            } else {
                throw new Error("Undefined error");
            }
        });
};

export {
    getLocation,
    updateLocation,
    createLocation,
    getUniverseLocations,
    searchLocations,
    deleteLocation
};