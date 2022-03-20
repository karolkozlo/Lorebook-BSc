import {
    getUser,
    postUser,
    deleteUser,
    updateUser,
  } from "../services/UserService.js";
import { NotFoundException } from "../errors.js";

async function getUsers(req, res) {
    if (req.params.email === undefined)
      res.status(400).send({ message: "Username must be defined" });
    try {
      const user = await getUser(req.params.username);
      res.status(200).json(user);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
}

async function postUsers(req, res) {
    try {
      const createdUser = await postUser(
        req.body.email,
        req.body.password,
        req.body.name
      );
      res.status(201).json(createdUser);
    } catch (e) {
      res.status(400).send({ message: e.message, path: e.path });
    }
}

async function deleteUsers(req, res) {
    try {
      await deleteUser(req.params.email);
      res.status(200).send();
    } catch (e) {
      res.status(400).send({ message: e.message });
    }
}

async function updateUsers(req, res) {
    try {
      const email = req.params.email;
      await updateUser(email, req.body);
      res.status(200).send();
    } catch (e) {
      if (e instanceof NotFoundException) {
        res.status(404);
      } else {
        res.status(400);
      }
      res.send({ message: e.message });
    }
  }

  export { getUsers, postUsers, deleteUsers, updateUsers };