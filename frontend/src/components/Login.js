import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'
import './FormPopup'
import FormPopup from "./FormPopup";
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Dodaj obsługę logowania

        // Po zalogowaniu przenieś użytkownika do strony domowej
        navigate('/home');
    };

    return (
        <form>
            <h3>Zaloguj się</h3>


            <div className="mb-3">
                <label>Email address</label>
                <input
                    className="form-control"
                    placeholder="twójemail@example.com"
                />
            </div>
            <div className="mb-3">
                <label>Hasło</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Hasło"
                />
            </div>
            <div>
                <div>
                    <Link to="/home" className="btn-primary">Zaloguj</Link>
                </div>
                <div>
                    <Link to="/auth/register">Nie masz konta? Zarejestruj się</Link>
                </div>
            </div>
            <div className="mb-3">

            </div>

        </form>



    );
};

export default Login;
