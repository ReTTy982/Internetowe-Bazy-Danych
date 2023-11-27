import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Register />} />
                <Route path="/home" element={<Home />} />
                {/* Przekierowanie wszystkich innych ścieżek do /auth/login */}
                <Route path="/" element={<Navigate to="/auth/login" />} />
                <Route path="/auth/*" element={<Navigate to="/auth/login" />} />
            </Routes>
        </Router>
    );
};

export default App;
