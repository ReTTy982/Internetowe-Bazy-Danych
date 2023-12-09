import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'
import './../device_form/FormPopup'
import {useAuth} from "./AuthContext";
import axios from 'axios';
import ResponsePopup from "../device_form/ResponsePopup";
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            const response = await axios.post('http://127.0.0.1:8000/login/', {
                name: username,
                password: password,
            });

            if (response.data.is_superuser) {
                navigate('/home', {state: {isAdmin: true}});
            } else {
                navigate('/home', {state: {isAdmin: false}});
            }
        } catch (error) {
            setShowError(true);
        }
    };

        // if(username==='admin' && password==='admin'){
        //     navigate('/home', {state: {isAdmin: true}});
        // } else if(username ==="123" && password ==="123"){
        //     navigate('/home', {state: {isAdmin: false}});
        // }


    return (
        <div>
        <form>
            <h3>Zaloguj się</h3>


            <div className="mb-3">
                <label>Nazwa użytkownika</label>
                <input
                    className="form-control"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label>Hasło</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Hasło"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
                <div>
                    <button className='btn-primary' onClick={handleSubmit}> Zaloguj</button>
                </div>
                <div>
                    <Link to="/auth/register">Nie masz konta? Zarejestruj się</Link>
                </div>
            </div>
            <div className="mb-3">
            </div>
        </form>

            <ResponsePopup
                trigger={showError}
                setTrigger={setShowError}
                message="Niepoprawna nazwa użytkowika lub hasło"></ResponsePopup>
        </div>


    );
};

export default Login;
