import LbAPI from "./LbAPI.js";

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
    createEntry,
    searchEntries,
    deleteEntry
};