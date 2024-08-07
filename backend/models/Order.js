const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    orderId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    orderDetails: { type: String, required: true }
});

module.exports = mongoose.model('Order', orderSchema);
