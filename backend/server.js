import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute.js';
import cartRoute from './routes/cartRoute.js';
import orderRoute from './routes/orderRoute.js';
import productRoute from './routes/productRoute.js';

dotenv.config();
mongoose.connect(process.env.MONGODB_URL,{useNewUrlParser: true,useUnifiedTopology: true, useCreateIndex: true,},function(error){
    if(error) console.log(error);

        console.log("connection successful");
});

const app=express();
app.use(bodyParser.json());

app.use("https://shoplinewebsite.herokuapp.com/api/users",userRoute);
app.use("https://shoplinewebsite.herokuapp.com/api/products",productRoute);
app.use("https://shoplinewebsite.herokuapp.com/api/cart",cartRoute);
app.use("https://shoplinewebsite.herokuapp.com/api/order",orderRoute);

app.listen(process.env.PORT || 5000,()=>{
    console.log("connected");
});
