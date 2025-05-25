const createUsers =(req,res) => {
    res.send('user created')
}

const loginUser =(req,res) => {
    res.send('user logedin')
}

const resetUser =(req,res) => {
    res.send('user logedin')
}

module.exports = {
    createUsers, loginUser, resetUser
};