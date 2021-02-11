import jwt from 'jsonwebtoken';
import config from './config';

const getToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        isAdmin: user.isAdmin
    }, config.JWT_SECRET,{
        expiresIn: '24h'
    })
}

const isAuth = (req,res,next) => {
    const token = req.headers.authorization;
    if(token){
        const onlytoken = token.split(" ")[1];
        jwt.verify(onlytoken, config.JWT_SECRET,(err,decode)=>{
            if(!err){
                req.user = decode;
                next();
                return;
            }
        })
    }
};

const isAdmin = (req,res,next) =>{
    if(req.user && req.user.isAdmin){
        next();
        return;
    }
}

export { getToken, isAdmin, isAuth };