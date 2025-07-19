const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const UserModel=require("../Models/user");
const signup=async(req,res)=>{
    try{
        const{name,email,password}=req.body;
        const user=await UserModel.findOne({email});
        if(user){
            return res.status(409)
                    .json({Message:'User already exists you can login',success:false});
        }
        const usermodel=new UserModel({name,email,password});
        usermodel.password=await bcrypt.hash(password,10);
        await usermodel.save();
        res.status(201)
             .json({
                message:"Signup Successfull",
                success:true
             })
    }catch(err){
        console.error("Signup/Login Error:", err);
        res.status(500)
            .json({
                message:"Internal Server Error",
                success:false
            })
    }
}

const login=async(req,res)=>{
    try{
        const{email,password}=req.body;
        const user=await UserModel.findOne({email});
        const errmssg='Auth failed email or password wrong';
        if(!user){
            return res.status(409)
                    .json({Message:errmssg,success:false});
        }
        const ispassEqual=await bcrypt.compare(password,user.password);
        if(!ispassEqual){
            return res.status(403)
                    .json({message:errmssg,success:false});
        }
        const jwtToken=jwt.sign(
            {email: user.email,_id:user._id},
            process.env.SECRET_CODE,
            {expiresIn:'24h'}
        );
        res.status(200)
             .json({
                message:'Login Success',
                success:true,
                jwtToken,
                email,
                name:user.name,
                _id: user._id
             })
    }catch(err){
        res.status(500)
            .json({
                message:"Internal Server Error",
                success:false
            })
    }
}

module.exports={
    signup,
    login
}