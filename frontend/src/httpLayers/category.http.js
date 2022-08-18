import LbAPI from "./LbAPI.js";

async function getUniverseCategories(universeID) {
    return await LbAPI
        .get(`/categories/universe/${universeID}`)
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

async function getUniverseCategoryList(universeID) {
    return await LbAPI
        .get(`/categories/universe/list/${universeID}`)
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

async function createCategory({name, universeID}) {
    return await LbAPI
        .post(`/categories`, {name, universeID})
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

async function updateCategory(categoryID, name) {
    return await LbAPI
    .patch(`/categories/${categoryID}`, {name})
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

async function removeCategory(categoryID) {
    return await LbAPI
        .delete(`/categories/${categoryID}`)
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

async function getCategory(categoryID) {
    return await LbAPI
        .get(`/categories/${categoryID}`)
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
    getCategory,
    getUniverseCategories,
    getUniverseCategoryList,
    createCategory,
    updateCategory,
    removeCategory
};