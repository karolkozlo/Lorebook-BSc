import LbAPI from "./LbAPI.js";

async function createEvent(name, description, date, universeID) {
    return await LbAPI
        .post(`/events`, {name, description, date, universeID,})
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
    createEvent
};