import React, { useState, useEffect } from 'react';

const SellerPage = () => {
    const [orders, setOrders] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:5004/api/orders');
                if (response.ok) {
                    const data = await response.json();
                    console.log('Fetched orders:', data); // Log fetched data
                    setOrders(data);
                } else {
                    console.error('Failed to fetch orders:', response.statusText);
                    setMessage('Failed to fetch orders');
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
                setMessage('Failed to fetch orders');
            }
        };

        fetchOrders();
    }, []);

    const handlePrint = async (orderId) => {
        try {
            const response = await fetch(`http://localhost:5004/api/orders/${orderId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setOrders(orders.filter(order => order.orderId !== orderId));
            } else {
                setMessage('Failed to delete order');
            }
        } catch (error) {
            console.error('Error deleting order:', error);
            setMessage('Failed to delete order');
        }
    };

    return (
        <div className="seller-container">
            

            <h1>Seller Dashboard</h1>
            {message && <p className="form-message">{message}</p>}
            <table className="orders-table">
                <thead>
                    <tr>
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
                            <tr key={order.orderId}>
                                <td>{order.name}</td>
                                <td>{order.email}</td>
                                <td>{order.address}</td>
                                <td>{order.orderDetails}</td>
                                <td>
                                    <button onClick={() => handlePrint(order.orderId)}>Print</button>
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
    );
};

export default SellerPage;
