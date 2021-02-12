import express from 'express';
import Order from '../models/orderModel.js';
import { isAdmin, isAuth } from '../util.js';

const router = express.Router();

router.get("/",isAuth,isAdmin,async(req, res) =>{
    try{
        const orders = await Order.find({});
        return res.status(200).send(orders);
    }catch(err){
        return;
    }
});

router.get("/:id",isAuth,async(req, res) =>{
    const id = req.params.id;
    const orders = await Order.find({"user.userId": id});
    res.status(200).send(orders);
});

router.post('/',isAuth,async (req,res) =>{
    const product = req.body.product;
    const userInfo = req.body.userInfo;
    const order = new Order({
        user: {
            userId: userInfo._id,
            userName: userInfo.name,
            userAddress: userInfo.address,
        },
        productsOrdered: product
    });
    const newOrder = await order.save();
        if (newOrder){
            res.status(200).send({msg: 'Order placed'});
        }
        else{
            res.status(401).send({msg: 'Cannot place your order'});
        }
});

router.post("/changeStatus/:id",async (req,res)=>{
    const productId=req.params.id;
        const UpdatedOrder = await Order.findOne({_id: productId});
        var i;
        for (i = 0; i < UpdatedOrder.productsOrdered.length; i++) {
            UpdatedOrder.productsOrdered[i].deliveryStatus = "Delivered";
          }
        UpdatedOrder.save();
        res.status(200).send({msg: "status updated"});
    }
);

router.post("/delete/:id",async(req,res)=>{
    const deleted = await Order.findByIdAndDelete({_id: req.params.id},function (err,foundItem){
        if(err){
            return res.status(500).send({message: "not deleted"});
        }
        else{
        return res.status(201).send({message: "deleted"});
        }
    });
});

export default router;
