import LbAPI from "./LbAPI.js";

async function registerUser(username, password, email) {
    return await LbAPI
        .post("/users", { username: username, password: password, email: email })
        .then(() => {
            return true;
        })
        .catch((error) => {
            if (error.response) {
                const err = new Error(`${error.response.data.message}`);
                err.path = error.response.data.path;
                throw err;
            } else if (error.request) {
                throw new Error("Service refused connection");
            } else {
                throw new Error("Undefined error");
            }
        });
}

export { registerUser };