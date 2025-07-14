const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    brandName: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('product', ProductSchema);
