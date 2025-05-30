const route =require('express').Router();
const usrController = require('../userController/userController');

route.post('/register', usrController.createUsers)

module.exports = route;