import React, { useState, useEffect } from 'react';
import '/Users/unmuktshukla/Documents/win/PrintPal/frontend/src/styles/global.css'; // Ensure this path is correct
import jsPDF from 'jspdf';
import Papa from 'papaparse';

const HomePage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        orderDetails: ''
    });

    const [message, setMessage] = useState('');
    const [orderId, setOrderId] = useState('');
    const [isSeller, setIsSeller] = useState(false); // New state for toggle
    const [orders, setOrders] = useState([]); // State for orders

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

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
                setOrderId(result.orderId);
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

    const toggleView = () => {
        setIsSeller(!isSeller);
    };

    useEffect(() => {
        if (isSeller) {
            const fetchOrders = async () => {
                try {
                    const response = await fetch('http://localhost:5004/api/orders');
                    if (response.ok) {
                        const data = await response.json();
                        setOrders(data);
                    } else {
                        setMessage('Failed to fetch orders');
                    }
                } catch (error) {
                    setMessage('Error fetching orders');
                }
            };
            fetchOrders();
        }
    }, [isSeller]);

    const handlePrint = async (orderId) => {
        try {
            const response = await fetch(`http://localhost:5004/api/orders/${orderId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setOrders(orders.filter(order => order._id !== orderId));
                setMessage('Order deleted successfully');
            } else {
                setMessage('Failed to delete order');
            }
        } catch (error) {
            setMessage('Failed to delete order');
        }
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.text("Orders List", 10, 10);

        orders.forEach((order, index) => {
            const y = 20 + (index * 10);
            doc.text(`Order ${index + 1}:`, 10, y);
            doc.text(`Name: ${order.name}`, 20, y + 10);
            doc.text(`Email: ${order.email}`, 20, y + 20);
            doc.text(`Address: ${order.address}`, 20, y + 30);
            doc.text(`Details: ${order.orderDetails}`, 20, y + 40);
        });

        doc.save('orders.pdf');
    };

    const downloadCSV = () => {
        const csv = Papa.unparse(orders);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', 'orders.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className={`home-container ${isSeller ? 'seller-view' : 'customer-view'}`}>
            <div className="top-bar">
                <button className="toggle-button" onClick={toggleView}>
                    {isSeller ? 'Customer View' : 'Seller View'}
                </button>
                <div className="user-info">
                    <span className="user-icon">👤</span>
                    <span className="user-name">Mrityunjay Pandey</span>
                </div>
            </div>

            {isSeller ? (
                <div className="seller-view-container">
                    <h2>Order Management</h2>
                    {message && <p className="form-message">{message}</p>}
                    <button onClick={downloadPDF}>Download PDF</button>
                    <button onClick={downloadCSV}>Download CSV</button>
                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Order Details</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length > 0 ? (
                                orders.map(order => (
                                    <tr key={order._id}>
                                        <td>{order.orderId}</td>
                                        <td>{order.name}</td>
                                        <td>{order.email}</td>
                                        <td>{order.address}</td>
                                        <td>{order.orderDetails}</td>
                                        <td>
                                            <button onClick={() => handlePrint(order._id)}>Print</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">No orders available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="customer-view-container">
                    <div className="project-info">
                        <h1>PrintPal</h1>
                        <p>Your Printing Partner</p>
                    </div>
                    <div className="form-container">
                        <form className="form" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name">Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="address">Address:</label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="orderDetails">Order Details:</label>
                                <input
                                    type="text"
                                    id="orderDetails"
                                    name="orderDetails"
                                    value={formData.orderDetails}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit">Place Order</button>
                            {message && <p className="form-message">{message}</p>}
                            {orderId && <p className="order-id">Your Order ID: {orderId}</p>}
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;
