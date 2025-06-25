const { UPDATE } = require("sequelize/lib/query-types");
// const authGuard = require("../middleware/authguard");
const { createUser, updateUser, deleteUser } = require("../userController/testController");
const { getAllUsers, updateUsers } = require("../userController/userController");

const express = require("express").Router();

express.post("/createUser", createUser);
express.put("/updateUser/:id", updateUser);
express.delete("/deleteUser/:id", deleteUser);
// express.get("/get",authGuard,getAllUsers);



module.exports = express;