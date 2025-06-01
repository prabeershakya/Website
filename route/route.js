const route =require('express').Router();
const usrController = require('../userController/userController');

route.post('/create', usrController.createUsers)
route.get('/getalluser', usrController.getAllUser)
route.put('/update/:id', usrController.updateUser)
route.delete('/delete/:id', usrController.deleteUser)
module.exports = route;