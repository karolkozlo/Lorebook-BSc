import {
    findUser,
    createUser,
    destroyUser,
    updateUser,
  } from "../services/UserService.js";
import { NotFoundException } from "../errors.js";

async function getUser(req, res) {
    if (req.params.id === undefined)
      res.status(400).send({ message: "ID must be defined" });
    try {
      const user = await findUser(req.params.id);
      res.status(200).json(user);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
}

async function postUser(req, res) {
    try {
      const createdUser = await createUser(
        req.body.email,
        req.body.password,
        req.body.name
      );
      res.status(201).json(createdUser);
    } catch (e) {
      res.status(400).send({ message: e.message, path: e.path });
    }
}

async function deleteUser(req, res) {
    try {
      await destroyUser(req.params.id);
      res.status(200).send();
    } catch (e) {
      res.status(400).send({ message: e.message });
    }
}

async function patchUser(req, res) {
    try {
      const id = req.params.id;
      await updateUser(id, req.body);
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

  export { getUser, postUser, deleteUser, patchUser };