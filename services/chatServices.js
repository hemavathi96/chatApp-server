/************************************************************
 * @description
 * @file        :   chatServices.js
 * @overview    :   To call chatMOdel as request on service.
 * @author      :    hemavathi B.V <hemavathibv16@gmail.com>
 * @version     :   1.0
 * @since       :   05-03-2019
 * *********************************************************/
const chatModel = require('../model/chatModel');

exports.addMessage = (req, callBack) => {
    console.log("Request on chat service");
    chatModel.addMessage(req, (err, data) => {
        if (err) {
            callBack("Error on service file : " + err);
        } else {
            console.log("Data on service file : ", data);
            callBack(null, data);
        }
    })
}
/**********************************getUserMsg********************************************
* @description:Passing the data to model to store the data in db.
* @param:request and callback function.
*************************************************************************/
exports.getUserMsg = (req, callBack) => {
    chatModel.getUserMsg(req, (err, data) => {
        if (err) {

            callBack(" please make sure Chat services is not working : " + err);
            callBack(err);
        } else {
            console.log("Chat service is working,everything is fine");
            callBack(null, data);
        }
    })
}
