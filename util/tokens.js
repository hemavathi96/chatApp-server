/************************************************************
 * Purpose      :   To store the data in database using mongoSchema.
 * @description
 * @file        :   token.js
 * @overview    :  
 * @author      :  hemavathi B.V <hemavathibv16@gmail.com>
 * @version     :   1.0
 * @since       :   05-march-2019
 * **********************************************************/
const jwt=require('jsonwebtoken')
module.exports={
    generateToken(payload){
        const token=jwt.sign({payload},'secretkey',{expiresIn:'1h'})
        const obj={
            success:true,
            message:"Token genearted successfully",
            token:token
        }
        return obj;
    }
}