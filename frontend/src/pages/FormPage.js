import React, { useState } from 'react';
import './FormPage.css'; // Import component-specific styles

const FormPage = () => {
    const [item, setItem] = useState('');
    const [quantity, setQuantity] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://localhost:5004/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
    
            const result = await response.json();
            if (response.ok) {
                setOrderId(result.orderId); // Ensure this matches what the backend returns
                setMessage('Order created successfully!');
                setFormData({
                    name: '',
                    email: '',
                    address: '',
                    orderDetails: ''
                });
            } else {
                setMessage(result.error || 'Failed to create order');
            }
        } catch (error) {
            setMessage('Failed to create order');
        }
    };
    

    return (
        <div className="form-container">
            <div className="form">
                <h1>Create Order</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="item">Item</label>
                        <input
                            type="text"
                            id="item"
                            value={item}
                            onChange={(e) => setItem(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="quantity">Quantity</label>
                        <input
                            type="number"
                            id="quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Submit</button>
                    {message && <div className="form-message">{message}</div>}
                </form>
            </div>
        </div>
    );
};

export default FormPage;
