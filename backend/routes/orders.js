const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // Ensure this path is correct
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// Middleware to validate ObjectId
const validateObjectId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'Invalid order ID format' });
    }
    next();
};

// Get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

// Create new Order
router.post('/', async (req, res) => {
    try {
        const { name, email, address, orderDetails } = req.body;
        const newOrder = new Order({
            orderId: uuidv4(), // Generate a unique order ID
            name,
            email,
            address,
            orderDetails
        });
        const savedOrder = await newOrder.save();
        res.status(201).json({ orderId: savedOrder.orderId });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
});

// Get a single order by ID
router.get('/:id', validateObjectId, async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ error: 'Failed to fetch order' });
    }
});

// Delete an order
router.delete('/:id', validateObjectId, async (req, res) => {
    try {
        const orderId = req.params.id;
        const result = await Order.findByIdAndDelete(orderId);
        if (!result) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ error: 'Failed to delete order' });
    }
});

module.exports = router;
