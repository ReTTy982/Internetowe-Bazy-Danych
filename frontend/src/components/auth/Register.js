import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');

    const navigate = useNavigate();

    const handleLogin = () => {
        // Przenieś użytkownika do okna logowania
        navigate('/auth/login');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (pass !== confirmPass) {
            console.log("Hasła się nie zgadzają");
            return;
        }

        const data = {
            username,
            password: pass,
            name,
            surname,
            email
        };

        try {
            // Dodaj logikę rejestracji
            console.log('Rejestracja udana!');
        } catch (error) {
            console.error('Błąd podczas wywoływania żądania:', error);
        }
    }

    return (
        <form>
            <h3>Zarejestruj się</h3>

            <div className="mb-4">
                <label>Nazwa użytkownika</label>
                <input
                    className="form-control"
                    placeholder="nazwa użytkownika"
                />
            </div>
            <div className="mb-4">
                <label>Email address</label>
                <input
                    className="form-control"
                    placeholder="twójemail@example.com"
                />
            </div>
            <div className="mb-4">
                <label>Imie</label>
                <input
                    className="form-control"
                    placeholder="Imie"
                />
            </div>
            <div className="mb-4">
                <label>Nazwisko</label>
                <input
                    className="form-control"
                    placeholder="Nazwisko"
                />
            </div>

            <div className="mb-4">
                <label>Hasło</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Hasło"
                />
            </div>
            <div className="mb-4">
                <label>Powtórz Hasło</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Hasło"
                />
            </div>
            <div>
                <div>
                    <Link to="/auth/login" className="btn-primary">Zarejestruj</Link>
                </div>
                <div>
                    <Link to="/auth/login">Masz konto? Zaloguj się</Link>
                </div>
            </div>
            <div className="mb-3">

            </div>

        </form>



    );
}

export default Register;
