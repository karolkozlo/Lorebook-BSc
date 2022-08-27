import LbAPI from "./LbAPI.js";

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

export {
    createCharacter
};