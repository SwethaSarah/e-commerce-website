import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
     id: {type: String, required: true, unique: true },
     name: {type: String, required: true},
     img:{data: Buffer,
    contentType: String},
     price: {type: Number, default: 0, required: true},
     brand: {type: String, required: true },
     category: {type: String, required: true },
     countAvailable: {type: Number, default: 0, required: true },
     description: {type: String, required: true },
 });

 const productmodel = mongoose.model("Product", productSchema);

 export default productmodel;