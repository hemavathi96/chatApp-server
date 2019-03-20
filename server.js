/******************************************************************************
 *  @Purpose        : To create a server to connect with front end and get the 
                     request and send response to client
 *  @file           : server.js        
 *  @author         : hemavathi B.V <hemavathibv16@gmail.com>
 *  @since          : 03 march 2019
 ******************************************************************************/
const router = require('../server/router/router')
const express = require('express');
const chatController = require('./controller/chatController')
const dbConfig = require('../server/config/config');
const mongoose = require('mongoose');
//const chatController = require('./controller/chatController')
// create express app
var app = express();
const bodyParser = require('body-parser');
const http = require('http');
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())
var ExpressValidator = require('express-validator');

app.use(ExpressValidator());
var socketIo = require('socket.io')

app.use('/', router)
app.use(express.static('../client'))

require('dotenv').config();
mongoose.Promise = global.Promise;
// Configuring the database
// Connecting to the database
/**
 * Connecting to the database.
 */ 

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    /**
     *Promise is success
     */
    console.log("Successfully connected to the database");
}).catch(err => {
    /**
     *Promise is rejected
     */
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

var server = app.listen(3000, function(){
    console.log("Server is connecting ..listening on port 3000");
});

const io = require('socket.io')(server)
//console.log("socket is working")
io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('createMessage', function (message) {
        console.log("something");
        chatController.message(message, (err, data) => {
            console.log("chat controller enter");

            if (err) {
                console.log(err);

            } else {
                console.log('message', message);

                io.emit('newMessage', message)
            }
        })
    })
    /**
    * socket Disconnect
    **/

    socket.on('disconnect', function () {
        console.log("user disconnected");
    });
});

