const User = require('../model/user.model');
import bycrypt from 'bcryptjs';
import Jwt from 'jsonwebtoken';

//SignUp controller
async function signup(req: any, res: any, next: any) {
    const salt = await bycrypt.genSalt(10);
    const hashpassword = await bycrypt.hash(req.body.password, salt)

    const emailExists = await User.findOne({email: req.body.email})
    if (emailExists) {
        res.status(400).json({"error": "Email already exists"})
    }
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashpassword,
    })
    try {
        const userSignup = await user.save()
        const payload = {
            user: {
                id: userSignup.id,
            }
        }
        Jwt.sign(payload, "anystring", {expiresIn: 10000}, function (err: any, token: any) {
            {
                if (err) {
                    res.send(err)
                }
                res.status(200).json({
                    "errorCode": 1,
                    "token": token,
                    "data": userSignup
                })
            }
        })
    } catch (err) {
        res.status(400).json({"errorCode": 400, "message": err})
    }
}
//Login Controller
async function login(req:any, res:any, next:any){
    const user=await req.body.user;;
    const emailExist = await User.findOne({ email: req.body.email})
    if (!emailExist){
        res.status(400).json({error:"Email not Found"})
    }
    const checkpassword = await bycrypt.compare(req.body.password, emailExist.password)
    if(!checkpassword){
        res.status(400).json({error:"Password mismatch"})
    }
    const token =Jwt.sign({_id:emailExist.id},'anystring')
    res.header('auth-token',token).json({'Token':token,'USER':user})
}
async function getCurrentUser(req:any,res:any){
    console.log(req.user)
    try {
        const user = await User.findById(req.user._id);
        res.json(user);
    } catch (e) {
        res.send({ message: "Error in Fetching user" });
    }
}

module.exports = {
    signup,
    login,
    getCurrentUser,
}
