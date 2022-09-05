import LbAPI from "./LbAPI.js";
import { NotFoundException } from '@/domain/errors.js';

async function getEntry(id) {
    return await LbAPI
        .get(`/entries/${id}`)
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

async function updateEntry(id, fields) {
    return await LbAPI
        .patch(`/entries/${id}`, fields)
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

async function createEntry(name, description, categoryID) {
    return await LbAPI
        .post(`/entries`, {name, description, categoryID})
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

async function searchEntries(categoryID, query, limit, offset) {
    const encodedQuery = encodeURIComponent(query);
    return await LbAPI
        .get(`/entries/search/${categoryID}?q=${encodedQuery}&limit=${limit}&offset=${offset}`)
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

async function deleteEntry(entryID) {
    return await LbAPI
        .delete(`/entries/${entryID}`)
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
    getEntry,
    updateEntry,
    createEntry,
    searchEntries,
    deleteEntry
};