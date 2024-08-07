// backend/routes/apiRoutes.js
const express = require('express');
const router = express.Router();
const ordersRoutes = require('./orders'); // Importing specific routes

// Example general API route
router.get('/status', (req, res) => {
    res.json({ status: 'API is working' });
});

// Use the orders routes
router.use('/orders', ordersRoutes);

module.exports = router;
