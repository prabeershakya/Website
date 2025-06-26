const route =require('express').Router();
const authGuard = require('../middleware/authguard');
const isAdmin = require('../middleware/isadmin');
const fileUpload = require('../middleware/multer');
const usrController = require('../userController/userController');

route.post('/create', fileUpload('image'),usrController.createUsers)
route.get('/get', usrController.getAllUsers)
route.get('/find/:id', usrController.find)
route.put('/update',authGuard,fileUpload("image"),usrController.updateUser)
route.delete('/delete/:id',usrController.deleteUser)
route.post('/login',usrController.loginUser)


module.exports = route; 