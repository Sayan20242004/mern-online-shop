const  ensureAuthentication=require('../Middlewares/Auth');
const router=require('express').Router();
router.get('/',ensureAuthentication,(req,res)=>{
    res.status(200).json([
        {
            name: "mobile",
            price: 10000
        },
        {
            name:"tv",
            price: 20000
        }
    ])
})
module.exports=router;