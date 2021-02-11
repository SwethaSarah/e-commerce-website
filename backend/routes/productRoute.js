import express from 'express';
import Product from '../models/productModel';
import BodyParser from 'body-parser';
import { isAdmin, isAuth } from '../util';
import path from 'path';
import multer from 'multer';
import fs from 'fs'; 


const router = express.Router();

var storage = multer.diskStorage({ 
    destination: (req, file, cb) => { 
        cb(null,__dirname) 
    }, 
    filename: (req, file, cb) => { 
        cb(null, file.fieldname) 
    } 
}); 
var upload = multer({ storage: storage }); 

router.get("/",async(req, res) =>{
    const products = await Product.find({});
    res.send(products);
});

router.post("/",upload.single('image'),isAuth,isAdmin,async (req,res,next)=>{
    const productId=req.body.id;
    const product = await Product.find({id: productId});
    const update={
        id: productId,
        name: req.body.name,
        price: req.body.price,
        img:{
            data: fs.readFileSync(path.join(__dirname +'\\'+ req.file.filename)), 
            contentType: 'image/png'
        },
        brand : req.body.brand,
        category : req.body.category,
        description : req.body.description,
        countAvailable : req.body.countAvailable}
    if(product.length!=0){
        const product = await Product.findOneAndUpdate({id:productId},update);
            if(product){
                res.status(200).send({message: "Product updated."})
            }
            else{
                res.status(400).send({message: "Product not updated."})
            }
    }else{
        const product = new Product(update);
        const newProduct = await product.save();
        if(newProduct){
            res.status(201).send({message: "created"});
        }
        else{
            res.status(500).send({message: "not created"});
        }
    }
});

router.post("/:id", async (req,res)=>{
    const product = await Product.findByIdAndDelete({_id: req.params.id},function (err,foundItem){
        if(err){
            res.status(500).send({message: "not deleted"});
        }
        else{
            res.status(201).send({message: "deleted"});
        }
    });
});

router.get('/:id',async (req,res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product){
        res.send(product);
    }
    else{
        res.status(404).send({msg: "Product not found."})
    }
});
export default router;
