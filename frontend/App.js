import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import './App.css';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={HomePage} />
            </Switch>
        </Router>
    );
};

export default App;
