const { User } = require("../model/user");

const createUsers = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    await User.create({ username, email, password });
    res.status(201).json({ success: true, message: "User created !!" });
  } catch (error) {
    res.status(400).json({ error: error.message }); // optional: send just error message
  }
};


const loginUser =(req,res) => {
    res.send('user logedin')
}

const resetUser =(req,res) => {
    res.send('user reset')
}

module.exports = {
    createUsers, loginUser, resetUser
};  