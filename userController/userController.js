const { User } = require("../model/user");
const bcrypt = require("bcrypt");

const createUsers = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newuser = await User.create({
      username: username,
      email,
      password:hashedPassword,
    });
    res.status(201).json({ sucess: true, newuser: newuser });
  } catch (error) {
    res.status(400).json({ error: error.message }); // optional: send just error message
  }
};

const getAllUser = async (req, res) => {
  try {
    const user = await User.findAll({
      attributes: { exclude: ["password", "email"] },
    });
    res.json({ sucess: true, users: user });
  } catch (error) {
    res.status(500).json({ error: "ERROR fetch user data" });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const userExist = await User.findByPk(userId);
    if (userExist) {
      console.log("User Exists");
      const { username, email, password } = req.body;
      const updateUser = await User.update(
        { username, password, email },
        { where: { id: userId }, returning: true }
      );
      res
        .status(201)
        .json({ sucess: true, message: "user Updated!!", updateUser });
    } else {
      res.json({ message: "User dosent exist" });
    }
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const userExist = await User.findByPk(userId);
    if (userExist) {
      const deleteUser = await User.destroy({ where: { id: userId } });
      res.json({
        sucess: true,
        message: "User deleted",
        deleteUser,
      });
    } else {
      res.json({ message: "User dosent exist" });
    }
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

const loginUser = (req, res) => {
  res.send("user logedin");
};

const resetUser = (req, res) => {
  res.send("user reset");
};

module.exports = {
  createUsers,
  loginUser,
  resetUser,
  getAllUser,
  updateUser,
  deleteUser,
};
