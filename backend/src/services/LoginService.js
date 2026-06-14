 import jwt from "jsonwebtoken";
 import config from "../config/config.example.js";
 import { InvalidArgumentException, NotFoundException, InvalidPasswordException } from "../errors.js";
 import { findUserByName } from "./UserService.js";
 import hashPassword from "../hashing.js";

 const { sign, verify } = jwt;

 const loginUser = async (name, password) => {
   if (typeof name !== "string") {
    throw new InvalidArgumentException("name must be a String");
   }
   if (typeof password !== "string") {
    throw new InvalidArgumentException("password must be a String");
   }
   let user;
   try {
     user = await findUserByName(name);
     if(!user) {
      throw new NotFoundException();
     }
   } catch (error) {
     if (error instanceof NotFoundException) {
        throw error;
     }
     throw new Error("Error getting the user information");
   }

   if (hashPassword(password) !== user.password) {
    throw new InvalidPasswordException("Invalid password");
   }

   const token = sign(
     {
       userID: user.id,
       name: user.name,
       email: user.email
     },
     config.secretKey,
     {
       algorithm: config.tokenAlgorithm,
       expiresIn: config.tokenExpiration,
       issuer: config.tokenIssuer,
       expiresIn: "8h",
     }
   );
   return { token_type: "jwt", token: token, user: user };
 };

const logoutUser =  async () => {
  const token = sign({ expired: "" }, config.secretKey, { expiresIn: "-8h" });
  return { token_type: "jwt", token: token };
};

const refreshToken = async (cookie) => {
  if (!(cookie.token instanceof String) && typeof cookie.token !== "string")
    throw new InvalidArgumentException(
      "token property of the cookie argument must be a string."
    );

  const decodeName = verify(
    cookie.token,
    config.secretKey,
    {
      issuer: config.tokenIssuer,
      algorithms: [config.tokenAlgorithm],
      maxAge: config.tokenExpiration,
    },
    (error, decoded) => {
      if (error) throw error;
      return decoded.name;
    }
  );

  const user = await findUserByName(decodeName);
  const newToken = sign(
    {
      userID: user.id,
      name: user.name,
      email: user.email,
    },
    config.secretKey,
    {
      algorithm: config.tokenAlgorithm,
      expiresIn: config.tokenExpiration,
      issuer: config.tokenIssuer,
    }
  );

  return {
    userData: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token: { token_type: "jwt", token: newToken },
  };
};

export {
  loginUser,
  logoutUser,
  refreshToken
};
