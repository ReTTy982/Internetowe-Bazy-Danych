import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import ResponsePopup from "../device_form/ResponsePopup";

const Register = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const handleLogin = () => {
        navigate('/auth/login');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (pass !== confirmPass) {
            setErrorMessage( "Hasła nie są takie same");
            setShowError(true);
        } else if(pass.length<8){
            setErrorMessage( "Hasła musi mieć conajmniej 8 znaków");
            setShowError(true);

        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/register/', {
                name: username,
                password: pass,
                email: email
            });
        } catch (error) {

            if(error.response){

                const statusCode = error.response.status;
                if(error.response.status === 409){
                    setErrorMessage("Użytkownik już istnieje");
                } else {

                }
                setShowError(true);
            }
        }
    }

    return (
        <div>
            <form className="login-form">
                <h3>Zarejestruj się</h3>

                <div className="mb-4">
                    <label>Nazwa użytkownika</label>
                    <input
                        className="form-control"
                        placeholder="nazwa użytkownika"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label>Email address</label>
                    <input
                        className="form-control"
                        placeholder="twójemail@example.com"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label>Hasło</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Hasło"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label>Powtórz Hasło</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Hasło"
                        value={confirmPass}
                        onChange={(e)=> setConfirmPass(e.target.value)}
                    />
                </div>
                <div>
                    <div>
                        <button className='btn-primary' onClick={handleSubmit}> Zarejestruj</button>
                    </div>
                    <div>
                        <Link to="/auth/login">Masz konto? Zaloguj się</Link>
                    </div>
                </div>
                <div className="mb-3">
                </div>
            </form>
            <ResponsePopup
                trigger={showError}
                setTrigger={setShowError}
                message={errorMessage}></ResponsePopup>
        </div>



    );
}

export default Register;
