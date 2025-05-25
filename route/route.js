const route =require('express').Router();
const usrController = require('../userController/userController');

route.get('/register', usrController.createUsers)

module.exports = route;