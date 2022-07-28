 import { loginUser, logoutUser, refreshToken } from "../services/LoginService.js";
 import {
   InvalidArgumentException,
   InvalidPasswordException,
   NotFoundException,
 } from "../errors.js";

 const loginUserController =  async (req, res) => {
   if (req.body.name === undefined || req.body.password === undefined) {
     res.status(400).send({ message: "name and password must be included in the body" });
       return;
   } else {
     try {
       const userDataAndToken = await loginUser(
         req.body.name,
         req.body.password
       );
       const token = (({ token_type, token }) => ({ token_type, token }))(
         userDataAndToken
       );
       res.cookie("LbToken", token, {
         httpOnly: true,
         sameSite: "lax",
         maxAge: 8 * 60 * 60 * 100,
         domain: "localhost",
       });
       const user = userDataAndToken.user;
       delete user.dataValues.password;
       res.status(200).send(user);
       return;
     } catch (error) {
       if (error instanceof InvalidArgumentException) {
        res.status(400).send({ message: "Invalid name or password type" });
        return;
       }
       if (error instanceof InvalidPasswordException) {
        res.status(400).send({ message: "Invalid password" });
        return;
       }
       if (error instanceof NotFoundException) {
        res.status(400).send({ message: "User not found" });
        return;
       }
       res.status(400).send({ message: "Error logging in" });
       return;
     }
   }
 };

const logoutUserController = async (req, res) => {
  try {
    const wipedToken = await logoutUser();
    res.cookie("LbToken", wipedToken, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 8 * 60 * 60 * 100,
      domain: "localhost",
    });
    res.status(200).send();
  } catch (error) {
    res.status(400).send({ message: "Error signing out" });
  }
};

const refreshTokenController = async (req, res) => {
  const LbAPIcookie = req.cookies.LbToken;
  try {
    const { userData, token } = await refreshToken(LbAPIcookie);
    res.cookie("LbToken", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 8 * 60 * 60 * 100,
      domain: "localhost",
    });
    let response = {};
    response.type = "success";
    response.data = userData;
    res.status(200).send(response);
  } catch (error) {
    res.status(200).send({
      type: "invalidToken",
      data: error.message,
    });
  }
};

 export { loginUserController, logoutUserController, refreshTokenController };