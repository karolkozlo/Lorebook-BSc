import LbAPI from "./LbAPI.js";

const loginUser = async (email, password) => {
  const user = await LbAPI
    .post("/login", { email: email, password: password })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        throw new Error(`${error.message}`);
      } else if (error.request) {
        throw new Error("Service refused connection");
      } else {
        throw new Error("Undefined error");
      }
    });
  return user;
}

export { loginUser };
