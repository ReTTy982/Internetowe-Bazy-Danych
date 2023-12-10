import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/view/Home';
import Users from "./components/view/Users";
import Cart from "./components/view/Cart";


const App = () => {

    const[authenticated, setAuthenticated] = useState(false);

    return (
            <Router>
                <Routes>
                    <Route path="/auth/login" element={<Login setAuthenticated={setAuthenticated}/>} />
                    <Route path="/auth/register" element={<Register />} />
                    <Route path="/home" element={<Home isAdmin={authenticated} />} />
                    <Route path="/" element={<Navigate to="/auth/login" />} />
                    <Route path="/auth/*" element={<Navigate to="/auth/login" />} />
                    <Route path="/users" element={<Users/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                </Routes>
            </Router>
    );
};

export default App;
