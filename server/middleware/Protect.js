import jwt from 'jsonwebtoken';
import  UserModel from '../model/UserModel.js';
import asyncHandler from 'express-async-handler';

const protect = asyncHandler(async(req,res, next) =>{
    let token;

     token = req.cookies.jwt

     if(token){
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY );

            req.user = await UserModel.findById(decoded.userId).select('-password')

            next();
        } catch (error){

            res.status(401)
            throw new Error('Not Authorized,Invalid Token')
        }

     }else{

        res.status(401)
        throw new Error('Not Authorized, No token')
     }
})

export default  protect