import types from "sequelize";
import hashPassword from "../hashing.js";
import { NotFoundException } from "../errors.js";
import { UniqueConstraintError } from 'sequelize';
import { db } from '../models/index.js';

const User = db.User;

async function createUser(email, password, name) {
    if (password.length < 5 || password.length > 20) {
        const err = new Error(
          "Password must have length between 5 and 20 characters"
        );
        err.path = "password";
        throw err;
    }
    try {
        const createdUser = await User.create({
            email: email,
            password: hashPassword(password),
            name: name
        }).then((result) => {
          const resultToReturn = result.get({plain: true});
          delete resultToReturn.password;
          return resultToReturn;
        });
        return createdUser;
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

async function findUser(id) {
    let user = null;
    try {
        user = await User.findOne({
            where: {
                id: id
            }
        });
        return user;
    } catch(e) {
        throw new NotFoundException("User not found");
    }
}

async function findAllUsers() {
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

async function destroyUser(id) {
    try {
      await db.User.destroy({
        where: { id: id },
      });
    } catch (e) {
      throw new Error(e.message);
    }
}

async function updateUser(id, updatedFields) {
    try {
      if ((await db.User.findOne({ where: { id: id } })) === null)
        throw new NotFoundException("User not found");
      const modelKeys = Object.keys(db.User.rawAttributes);
      let subsetFields = modelKeys
        .filter((key) => key in updatedFields)
        .reduce((subset, key) => {
          subset[key] = updatedFields[key];
          return subset;
        }, {});
      if ("password" in subsetFields)
        subsetFields.password = hashPassword(subsetFields.password);
      await db.User.update(subsetFields, { where: { id: id } });
    } catch (e) {
      throw new Error(e.message);
    }
  }

  export { createUser, updateUser, destroyUser, findUser, findAllUsers }