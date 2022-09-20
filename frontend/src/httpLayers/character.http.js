import LbAPI from "./LbAPI.js";
import { NotFoundException } from '@/domain/errors.js';

async function getCharacter(id) {
    return await LbAPI
        .get(`/characters/${id}`)
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

async function updateCharacter(id, fields) {
    return await LbAPI
        .patch(`/characters/${id}`, fields)
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

async function createCharacter(name, description, universeID) {
    return await LbAPI
        .post(`/characters`, {name, description, universeID})
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

async function searchCharacters(universeID, query, limit, offset) {
    const encodedQuery = encodeURIComponent(query);
    return await LbAPI
        .get(`/characters/search/${universeID}?q=${encodedQuery}&limit=${limit}&offset=${offset}`)
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

async function deleteCharacter(characterID) {
    return await LbAPI
        .delete(`/characters/${characterID}`)
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
    getCharacter,
    updateCharacter,
    createCharacter,
    searchCharacters,
    deleteCharacter
};