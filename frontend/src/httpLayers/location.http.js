import LbAPI from "./LbAPI.js";

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

export {
    createLocation,
    getUniverseLocations
};