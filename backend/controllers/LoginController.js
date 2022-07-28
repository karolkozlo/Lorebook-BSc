 import loginUser from "../services/LoginService.js";
 import {
   InvalidArgumentException,
   InvalidPasswordException,
   NotFoundException,
 } from "../errors.js";

 export default async (req, res) => {
   if (req.body.email === undefined || req.body.password === undefined) {
     res
       .status(400)
       .send({ message: "email and password must be included in the body" });
   } else {
     try {
       const userDataAndToken = await loginUser(
         req.body.email,
         req.body.password
       );
       const token = (({ token_type, token }) => ({ token_type, token }))(
         userDataAndToken
       );
       res.cookie("wofToken", token, {
         httpOnly: true,
         sameSite: "lax",
         maxAge: 8 * 60 * 60 * 100,
         domain: "localhost",
       });
       const user = userDataAndToken.user;
       delete user.dataValues.password;
       res.status(200).send(user);
     } catch (error) {
       if (error instanceof InvalidArgumentException)
         res.status(400).send({ message: "Invalid email or password type" });
       if (error instanceof InvalidPasswordException)
         res.status(400).send({ message: "Invalid password" });
       if (error instanceof NotFoundException)
         res.status(400).send({ message: "User not found" });
       res.status(400).send({ message: "Error logging in" });
     }
   }
 };
