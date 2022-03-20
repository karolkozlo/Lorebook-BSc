import types from "sequelize";
import hashPassword from "../hashing.js";
import { NotFoundException } from "../errors.js";
import { UniqueConstraintError } from 'sequelize';
import { db } from '../models/index.js';

const User = db.User;

async function postUser(email, password, name) {
    if (password.length < 5 || password.length > 20) {
        const err = new Error(
          "Password must have length between 5 and 20 characters"
        );
        err.path = "password";
        throw err;
    }
    try {
        await User.create({
            email: email,
            password: hashPassword(password),
            name: name
        });
    } catch (e) {
        if(e instanceof UniqueConstraintError) {
            throw new Error("Account with this email already exists");
        }
        if (e.errors[0] instanceof types.ValidationErrorItem) {
            const errorData = (({ message, path }) => ({ message, path }))(
              e.errors[0]
            );
            const err = new Error(errorData.message);
            err.path = errorData.path;
            throw err;
        } else {
            throw new Error("Undefined error");
        }
    }
};

async function getUser(email) {
    let user = null;
    try {
        user = await User.findOne({
            where: {
                email: email
            }
        });
        return user;
    } catch(e) {
        throw new NotFoundException("Email not found");
    }
}

async function getAllUsers() {
    let users = null;
    try {
        users = await User.findAll({
            attributes: [
                'id',
                'email',
                'name',
            ]
        });
        return users;
    } catch (e) {
        throw e;
    }
}

async function deleteUser(username) {
    try {
      await db.User.destroy({
        where: { username: username },
      });
    } catch (e) {
      throw new Error(e.message);
    }
}

async function updateUser(email, updatedFields) {
    try {
      if ((await db.User.findOne({ where: { email: email } })) === null)
        throw new NotFoundException("Email not found");
      const modelKeys = Object.keys(db.User.rawAttributes);
      let subsetFields = modelKeys
        .filter((key) => key in updatedFields)
        .reduce((subset, key) => {
          subset[key] = updatedFields[key];
          return subset;
        }, {});
      if ("password" in subsetFields)
        subsetFields.password = hashPassword(subsetFields.password);
      await db.User.update(subsetFields, { where: { email: email } });
    } catch (e) {
      throw new Error(e.message);
    }
  }

  export { postUser, updateUser, deleteUser, getUser, getAllUsers }