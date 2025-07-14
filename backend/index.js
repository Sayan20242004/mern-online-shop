const express=require('express');
const app=express();
require('dotenv').config();
require('./Models/db');
const AuthRouter=require('./Routes/AuthRouter');
const cartRouter = require('./Routes/CartRouter');
const productRouter1=require('./Routes/ProductRouter1');
const bodyParser=require('body-parser');
const cors=require('cors');
const productRouter=require('./Routes/ProductRouter');

const PORT=process.env.PORT || 8080;

app.get('/ping',(req,res)=>{
    res.send('PONG');
})
app.use(bodyParser.json());
app.use(cors());
app.use('/auth',AuthRouter);
app.use('/product',productRouter);
app.use('/cart', cartRouter);
app.use('/product1', productRouter1);


app.listen(PORT,()=>{
    console.log(`Sever is running on port ${PORT}`)
})