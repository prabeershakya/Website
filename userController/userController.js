const { User } = require("../model/user");
const bcrypt = require('bcrypt');
require("dotenv").config();
const jwt = require ('jsonwebtoken');


  const createUsers = async (req, res) => {
    console.log(  req.files?.length ? req.files[0].path : null)
    try {
      const { username, email, password } = req.body;
    //  const image = req.files?.[0]?.path || null;
      const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password,salt);
  const newuser = await User.create({
    username:username,
    email,
    password:hashedPassword,
  });
  res.status(201).json({ success:true,newuser:newuser});
    } catch (error) {
      res.status(400).json({ error: error.message }); // optional: send just error message
    }
  }

const getAllUsers = async (req, res) => {
  console.log("Authorization header:", req.headers.authorization);
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    res.json({ success: true, users: users });
  } catch (error) {
    console.error("Error fetching users:", error); // 👈 this will show the real error in terminal
    res.status(500).json({ error: "Error fetching users" });
  }
};

const find = async (req,res) => {
  const userId = req.body.id;
  try {
      const users = await User.findOne({where:{id:userId}});
      if (userExist){
        res.json({userExist})
      } else {
        res.json({message:"user not found"})
      }
  } catch (error) {
      res.status(500).json({ error:"Error fetching users"});
  }
}


const updateUser = async (req,res) => {
  const userId = req.user.id
  console.log(req.body)
  try {
    const userExist = await User.findByPk(userId);
    if (userExist) {
      console.log("user exist")
      const { username,email,password }= req.body;
      const image = req.file ? req.file.filename : userExist.image;
      let hashedPassword=userExist.password
      if (password) {
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(password, salt);
      }
      const updateUser = await User.update(
        { username,email,password:hashedPassword,image},
        {where:{id: userId}, returning:true});
      res.status(201).json({ success:true,message:"user Updates!!",updateUser});
    }
    else {
      res.json({message:"user doesn't exist"})
    }
  } catch (error) {
    res.status(400).json({ error:error});

  }
}

const deleteUser = async (req,res) => {
  const userId = req.params.id;
  try {
    const userExist = await User.findByPk(userId);
    if (userExist) {
      const deleteUser = await User.destroy(
        { where:{id:userId}});
      res.json({
        success:true,
        message:"user deleted",deleteUser
      })
    }
    else {
      res.json({ success:false,message:"user not found!!"})
    }
  } catch (error) {
    res.status(400).json({ error:error});
  }
}

const loginUser = async (req,res) => {
  console.log(req.body)
try {
const { email, password } = req.body;
const user = await User.findOne({ where: { email } });
if (!user) {
return res.status (404).json({ success: false, message: 'User not found' });
}
const isMatch = await bcrypt.compare(password,user.password);

if(!isMatch) {
  return res.status(401).json({ success : false,message: 'Invalid credentials'});
}
const token = jwt.sign(
  { id: user.id,email: user.email, role:user.role},
  process.env.JWT_TOKEN,
  { expiresIn: '24h'}
);

return res.status (200).json({
  success: true, message: 'Login successful', token, user: { 
    id: user.id, 
    username: user.username,
  email: user.email
  }
});
} catch (error) {
  res.status(400).json({ error:error});
}
};


const resetUser =(req,res) => {
  res.send('user reset')
}






module.exports = {
    createUsers, loginUser, resetUser , getAllUsers , updateUser , deleteUser , find
};  
