import express from 'express';
import User from '../models/userModel.js';
import { getToken, isAuth } from '../util.js';
const router = express.Router();

router.post('/signin', async (req,res) =>{
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
});
    if (signinUser){
        res.send({
            _id: signinUser.id,
            name: signinUser.name,
            email: signinUser.email,
            address: signinUser.address,
            isAdmin: signinUser.isAdmin,
            token: getToken(signinUser)
        })
    }
    else{
        res.status(401).send({msg: 'Invalid Email or Pasword'});
    }
});

router.post('/register', async (req,res) =>{
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        password: req.body.password
    });
    const newUser = await user.save();
    if (newUser){
        res.send({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            address: newUser.address,
            isAdmin: newUser.isAdmin,
            token: getToken(newUser)
        });
    }
    else{
        res.status(401).send({msg: 'Cannot create an account'});
    }
});


router.post("/profile",isAuth, async(req,res) =>{
    const data=req.body.name;
    const update={
        name: data.name,
        address: data.address,
        phoneno: data.phno
    }
    const user = await User.findOneAndUpdate({email: data.email},update);
    if(user){
            return res.status(200).send({
                _id: user.id,
                name: user.name,
                email: user.email,
                phoneno: user.phoneno,
                address: user.address,
                isAdmin: user.isAdmin,
                token: getToken(user)
            });
        }
        else{
            return res.status(400).send({message: "Profile not updated."})
        }
});

router.get("/profile/:userInfo",isAuth, async(req,res) =>{
    const userInfo=req.params.userInfo;
    const userFound = await User.findOne({_id:userInfo});
    if(userFound){
        return res.status(200).send(userFound);
    }
    else{
        return res.status(400).send({message: "Profile not found."})
    }
});

export default router;
