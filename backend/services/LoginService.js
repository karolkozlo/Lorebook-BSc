 import jwt from "jsonwebtoken";
 import config from "../config/config.example.js";
 import { InvalidArgumentException, NotFoundException, InvalidPasswordException } from "../errors.js";
 import { findUserByEmail } from "./UserService.js";
 import hashPassword from "../hashing.js";

 const { sign } = jwt;

 const loginUser = async (email, password) => {
   if (typeof email !== "string") {
    throw new InvalidArgumentException("Email must be a String");
   }
   if (typeof password !== "string") {
    throw new InvalidArgumentException("password must be a String");
   }
   let user;
   try {
     user = await findUserByEmail(email);
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
       email: user.email,
       name: user.name
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

 export default loginUser;
