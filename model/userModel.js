/************************************************************
 * Purpose      :   To store the data in database using mongoSchema.
 * @description
 * @file        :   userModel.js
 * @overview    :   Storing the userdata in database.
 * @author      :  hemavathi B.V <hemavathibv16@gmail.com>
 * @version     :   1.0
 * @since       :   05-march-2019
 * **********************************************************/
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
let saltRounds = 10;

const UserSchema = mongoose.Schema({
    username: {
        type: String, require: [true, "username require"]
    },

    email: {
        type: String, require: [true, "email require"]
    },
    password: {
        type: String, require: [true, "password require"]
    },
    confrirmepassword: {
        type: String, require: [true, "confirmepassword require"]
    },
},
    {
        timestamps: true
    });
function userModel() { }

var user = mongoose.model('user', UserSchema);
function hash(password) {
    console.log("password=>", password);
    var hash = bcrypt.hashSync(password, saltRounds);
    return hash;
}
/*registration
 * @description:First validate the user exists already if not store the user data in the database
 *              using mongoschema.
 * @param:request and callback function.
 **/
userModel.prototype.register = (body, callBack) => {
    // console.log("body in model ==>", body);

    user.find({ "email": body.email }, (err, data) => {
        if (err) {
            console.log("Error is register");
            callBack(err)

        }
        else if (data.length > 0) {
            console.log("data.length" + data);
            console.log("Email already exists");
            callBack("user already present");
        }
        else {
            const newUser = new user({

                "username": body.username,
                "email": body.email,
                "password": hash(body.password),

            });
            newUser.save((err, result) => {
                if (err) {
                    console.log("Model not found");
                    callBack(err)

                }
                else {
                    console.log("Register Successfully");
                    callBack(null, result)
                }
            })
        }
    })

}

userModel.prototype.login = (body, callBack) => {
    user.find({ "email": body.email }, (err, data) => {
        //if findone results error
        if (err) {
            callBack(err)
        }
        //if data is not equal to null then compare the password.
        else if (data.length > 0) {
            bcrypt.compare(body.password, data[0].password, function (err, res) {
                if (res) {
                    console.log("Login Successfully");
                    return callBack(null, data);

                }
                else if (err) {
                    console.log("Incorrect Password");
                    return callBack("Incorrect Password");

                }

                else {
                    return callBack("Incorrect password").status(500)
                }
            });

        } else {
            console.log("Invalid User");
            return callBack("Invalid User");

        }
    })
}
/*findUserEmail
 * @description:Find the email-id in db if it is not valid show error message else send the result.
 * @param:request and callback function.
 */
userModel.prototype.findUserEmail = (data, callBack) => {
    user.findOne({ "email": data.email }, (err, result) => {
        if (err) {
            callBack(err);
        }
        else if (result) {
            if (result !== null && data.email == result.email) {
                return callBack(null, result);

            }
            else {
                callBack("Incorrect Email")
            }
        }
    });
}
userModel.prototype.confirmUser = (data, callBack) => {
    user.updateOne({ _id: data.payload.id }, { is_verified: true }, (err, result) => {
        if (err) {
            callBack(err);
        }
        else {
            callBack(null, result);
        }
    });
}
/*updatePassword
 * @description:Take the password from the request and bcrypt the password using saltround and 
 *              update the password to the specified  email-id.
 * @param:request and callback function.
 */

userModel.prototype.updatePassword = (req, callBack) => {
    console.log(' in model--data:--', req.decoded);
    console.log(' in model--body:--', req.body);
    let newPassword = bcrypt.hashSync(req.body.password, saltRounds)
    console.log("new password:", newPassword);
    user.updateOne({ _id: req.decoded.payload.user_id }, { password: newPassword }, (err, result) => {
        if (err) {
            callBack(err);
        }
        else {
            callBack(null, result);
        }
    });
}
/*getAllUser
 * @description:Find all user from the db and return the array.
 * @param:request and callback function.
 **/
userModel.prototype.getAllUser = (req, callBack) => {
    user.find({}, (err, result) => {
        if (err) {
            callBack(err);
        }
        else {
            callBack(null, result)
        }
    });
}
module.exports = new userModel;