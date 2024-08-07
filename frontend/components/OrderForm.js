import React, { useState } from 'react';
import axios from 'axios';

const OrderForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        product: '',
        quantity: '',
        address: ''
    });

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/orders', formData);
            alert('Order placed successfully');
        } catch (error) {
            console.error(error);
            alert('Error placing order');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input type="text" name="product" placeholder="Product" value={formData.product} onChange={handleChange} required />
            <input type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} required />
            <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
            <button type="submit">Place Order</button>
        </form>
    );
};

export default OrderForm;
