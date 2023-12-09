import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/view/Home';
import Users from "./components/view/Users";


const App = () => {

    const[authenticated, setAuthenticated] = useState(false);

    return (
            <Router>
                <Routes>
                    <Route path="/auth/login" element={<Login />} />
                    <Route path="/auth/register" element={<Register />} />
                    <Route path="/auth/*" element={<Navigate to="/auth/login" />} />
                    <Route path="/home" element={<Home isAdmin={false} />} />
                    <Route path="/" element={<Navigate to="/auth/login" />} />

                    <Route path="/users" element={<Users/>}/>
                </Routes>
            </Router>
    );
};

export default App;
