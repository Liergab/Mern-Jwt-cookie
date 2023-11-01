import asyncHandle from 'express-async-handler'
import UserModel from '../model/UserModel.js'
import bcrypt from 'bcrypt'
import generateToken from '../middleware/GenerateToken.js'

export const getUser = (req, res) => {
  res.json(req.user)
}

export const register = asyncHandle(async(req, res) => {
    const {username, email, password} = req.body

    if(!username || !email || !password){
        res.status(400)
        throw new Error('All Fields are required!')
    }

    const validate = await UserModel.findOne({email})

    if(validate){
        res.status(400)
        throw new Error('email has been used already!')
    }
    const validateUsername = await UserModel.findOne({username})
    if(validateUsername){
        res.status(400)
        throw new Error('username has been used already!')
    }
    
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const user = await UserModel.create({
        username,
        email,
        password:hashPassword
    })
    

    if(user){
        generateToken(res,user._id)
        res.status(201).json(user)
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
   
});


export const login = asyncHandle(async(req,res) => {
    const {email, password} = req.body
    if(!email || !password){
        res.status(400)
        throw new Error('All fields required!')
    }

    const user = await UserModel.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        generateToken(res, user.id)
        res.status(200).json({
            _id:user.id,
            username: user.username,
            email:user.email,
   
        })
    }else{
        res.status(400)
        throw new Error('Invalid Credentials!')
    }
});

export const logout = asyncHandle(async(req,res) => {
    res.cookie('jwt','',{
        httpOnly:true,
        expires: new Date(0)
    })

    res.status(200).json({message: 'Logout'})
})

export const updateUser = asyncHandle(async(req,res) => {
    // const id =  (req.params.id).trim()
    const {username, email, password} = req.body;
    if( req.user.id){
       
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        const user = await UserModel.findByIdAndUpdate(req.user.id,{$set:{
            username,
            email,
            password: hashPassword
        }})
        res.status(201).json(user)
    }else{
        res.status(401)
        throw new Error('Ypu Can not update others Data')
    }
 
})