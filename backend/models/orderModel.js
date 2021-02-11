import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user: {
        userId: String,
        userName: String,
        userAddress: String,
    },
    productsOrdered: [{
        productId: String,
        productName: String,
        qty: Number,
        deliveryStatus: String
    }],
});

const ordermodel = mongoose.model("Order", orderSchema);

export default ordermodel;