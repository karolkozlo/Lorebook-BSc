import LbAPI from "./LbAPI.js";
import { NotFoundException } from '@/domain/errors.js';

async function getEvent(id) {
    return await LbAPI
        .get(`/events/${id}`)
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

async function updateEvent(id, fields) {
    return await LbAPI
        .patch(`/events/${id}`, fields)
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

async function searchEvents(universeID, query, limit, offset) {
    const encodedQuery = encodeURIComponent(query);
    return await LbAPI
        .get(`/events/search/${universeID}?q=${encodedQuery}&limit=${limit}&offset=${offset}`)
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

async function deleteEvent(eventID) {
    return await LbAPI
        .delete(`/events/${eventID}`)
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
    getEvent,
    updateEvent,
    createEvent,
    searchEvents,
    deleteEvent
};