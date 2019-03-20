/************************************************************
 * @description
 * @file        : authorization.js
 * @overview    : To verify the authorized user using token .
 * @author      :  hemavathi B.V <hemavathibv16@gmail.com>
 * @version     : 1.0
 * @since       : 5-march-2019
 * *********************************************************/
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const chatController = require("../controller/chatController");
const auth = require('../middleware/authentication');

router.post('/getAllUser', auth.auth, userController.getAllUser);

router.get('/getUserMsg', auth.auth, chatController.getUserMsg);

module.exports = router;





