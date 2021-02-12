import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute';
import cartRoute from './routes/cartRoute';
import orderRoute from './routes/orderRoute';
import productRoute from './routes/productRoute';

dotenv.config();
mongoose.connect(config.MONGODB_URL,{useNewUrlParser: true});

const app=express();
app.use(bodyParser.json());

app.use("/api/users",userRoute);
app.use("/api/products",productRoute);
app.use("/api/cart",cartRoute);
app.use("/api/order",orderRoute);

app.listen(5000,()=>{
    console.log("connected");
})
