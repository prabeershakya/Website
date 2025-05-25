const { UPDATE } = require("sequelize/lib/query-types");
const { createUser, updateUser, deleteUser } = require("../userController/testController");

const express = require("express").Router();

express.post("/createUser", createUser);
express.put("/updateUser/:id", updateUser);
express.delete("/deleteUser/:id", deleteUser);


module.exports = express;