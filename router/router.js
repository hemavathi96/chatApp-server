/************************************************************
 * Purpose      :   To store the data in database using mongoSchema.
 * @description
 * @file        :   router.js
 * @overview    :   
 * @author      :   hemavathi B.V <hemavathibv16@gmail.com>
 * @version     :   1.0
 * @since       :   05-march-2019
 * **********************************************************/
const express = require('express');
const author = require('./authorization');
const router = express.Router();
const notes = require('../controller/userController');
const note = require('../controller/chatController');

const loginMiddleWare = require('../middleware/authentication')
console.log("abcd");

router.post('/Register', notes.register);
router.post('/login', notes.login);
router.post('/Forgotpassword', notes.forgotpassword);
router.use('/auth', author);
router.post('/Resetpassword/:token', loginMiddleWare.auth, notes.resetPassword);
router.get('/getAllUser', notes.getAllUser);
router.get('/getUserMsg',note.getUserMsg)
module.exports = router;

