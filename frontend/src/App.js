// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SellerPage from './pages/SellerPage';
import './styles/global.css';

const App = () => {
    const [isSeller, setIsSeller] = useState(false);

    const handleToggle = () => {
        setIsSeller(!isSeller);
    };

    return (
        <Router>
            <div className={`app-container ${isSeller ? 'seller-mode' : 'customer-mode'}`}>
                
                <Routes>
                    <Route path="/" element={isSeller ? <SellerPage /> : <HomePage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
