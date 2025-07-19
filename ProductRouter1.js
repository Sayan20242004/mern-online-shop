const express = require('express');
const router = express.Router();
const ProductModel = require('../Models/Product');

// Add a new product
router.post('/add', async (req, res) => {
    try {
        const { brandName, productName, rate, type } = req.body;
        const product = new ProductModel({ brandName, productName, rate, type});
        await product.save();
        res.status(201).json({ success: true, message: "Product added successfully" });
        console.log("Product added:", data.product);

    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// Get all products
router.get('/all', async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.status(200).json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

module.exports = router;
