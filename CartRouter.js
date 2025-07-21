const express = require('express');
const router = express.Router();
const CartModel = require('../Models/Cart');

// Add item to cart
router.post('/add', async (req, res) => {
    try {
        const { userId, brandName, productName, rate, quantity = 1 } = req.body;
        const finalPrice = rate * quantity;

        const newCartItem = new CartModel({ userId, brandName, productName, quantity, rate, finalPrice });
        await newCartItem.save();

        res.status(201).json({ success: true, message: 'Item added to cart' });
    } catch (error) {
        console.error('Add to cart error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Get cart items by user ID
router.get('/:userId', async (req, res) => {
    try {
        const cartItems = await CartModel.find({ userId: req.params.userId });
        res.status(200).json({ success: true, cartItems });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
