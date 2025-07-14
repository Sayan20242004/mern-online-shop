const jwt=require('jsonwebtoken');
const ensureAuthenticated=(req,res,next)=>{
    const auth=req.headers['authorization'];
    if(!auth){
        return res.status(403)
                .json({message:'Unauthorized, new JWT needs to be generated'});
    }
    try{
        const decoded=jwt.verify(auth,process.env.SECRET_CODE);
        req.user=decoded;
        next();
    }catch(error){
        return res.status(403)
                .json({message:'Unnauthorized jwt token or expired'});
    }
}
module.exports=ensureAuthenticated;