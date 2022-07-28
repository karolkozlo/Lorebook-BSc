import LbAPI from "./LbAPI.js";

const loginUser = async (name, password) => {
  const user = await LbAPI
    .post("/login", { name: name, password: password })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        throw new Error(`${error.response.data.message}`);
      } else if (error.request) {
        throw new Error("Service refused connection");
      } else {
        throw new Error("Undefined error");
      }
    });
  return user;
};

async function logoutUser() {
  return await LbAPI
    .get("/logout")
    .then(() => {
      return true;
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
};

const refreshToken = async () => {
  const user = await LbAPI.get('/refreshToken')
  .then((response) => {
    return response.data;
  }).catch(() => {
  });
  return user;
};

export { loginUser, logoutUser, refreshToken };
