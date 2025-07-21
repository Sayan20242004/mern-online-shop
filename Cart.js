const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    brandName: String,
    productName: String,
    quantity: {
        type: Number,
        default: 1
    },
    rate: Number,
    finalPrice: Number // quantity * rate
}, { timestamps: true });

module.exports = mongoose.model('cart', CartSchema);
