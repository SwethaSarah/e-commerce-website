import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
     name: {type: String, required: true},
     email: {type: String, required: true, unique: true},
     address: {type: String, required: true,default: ""},
     phoneno: {type: Number},
     password: {type: String, required: true },
     isAdmin: {type: Boolean, required: true, default: false},
     cartItems:[
        {
           product_id: String,
           productImage:{data: Buffer,contentType: String},
           productName: String,
           productPrice: Number,
           qty: Number,
        }
    ]
 });

 const usermodel = mongoose.model("User", userSchema);

 export default usermodel;