import express from 'express';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import { isAuth } from '../util.js';

const router = express.Router();

router.get("/:userId",isAuth,async(req, res) =>{
    const userId=req.params.userId;
    const foundUser = await User.findOne({_id: userId});
    return res.send(foundUser.cartItems);
});

router.post("/:userId",isAuth,async (req,res)=>{
    const productId=req.body.productId;
    const product = await Product.findOne({_id: productId});
    var qty=parseInt(req.body.qty);
    const userId=req.params.userId;
    const foundUser = await User.findOne({_id: userId});
    if(foundUser){
        if(product){
            for(var i in foundUser.cartItems){
                if (foundUser.cartItems[i].product_id == product._id){
                    foundUser.cartItems[i].qty += qty;
                    foundUser.save();
                    return res.status(200).send({message: "Product updated."});
                }
            }
            const pushdata={product_id: product._id,productImage: product.img,productName: product.name,productPrice: product.price,qty:qty};
            foundUser.cartItems.push(pushdata);
            foundUser.save();
            return res.status(200).send({message: "Product updated."})
        }
        else{
            return res.status(400).send({message: "Product not updated."})
        }
}

});

router.post("/:userId/:itemId",async (req,res)=>{
    const itemId=req.params.itemId;
    const userId=req.params.userId;
    const foundUser = await User.findOne({_id: userId});
    if(foundUser){
            if(itemId){
                foundUser.cartItems.pull({_id: itemId});
                foundUser.save();
                return res.status(200).send({message: "Product deleted."})
            }
            else{
                return res.status(400).send({message: "Product not deleted."})
            }
    }
});

export default router;
