const createUser = async (req , res) => {
    console.log(req.headers)
    console.log(req.body)
    return res.send("user created")
};

const updateUser = async (req , res) => {
    console.log(req.body)
    console.log(req.params)
    return res.send("User updated")
};

const deleteUser = async (req , res) => {
    console.log(req.body)
    return res.send("User Deleted")
};
module.exports={createUser,updateUser,deleteUser}