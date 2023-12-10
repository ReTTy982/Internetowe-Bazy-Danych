import React, { useState } from 'react';
import FormPopup from "../device_form/FormPopup";
import {useNavigate} from 'react-router-dom'
import axios from "axios";
const UserCartBar = ({ onSidebarChange }) => {

    const navigate = useNavigate();
    const user_id = localStorage.getItem("user_id");

    const handleBackToDevices = () =>{
        navigate('/home');
    }

    const handleDeleteCart =() =>{

        axios.delete('http://127.0.0.1:8000/deleteCart', {
            data: {
                customer_id: user_id,
            },
            headers: {
                'Content-type': 'application/json;',
            },
        })
            .then((response) => {
                console.log('Koszyk został pomyślnie usunięty.');
                window.location.reload();
            })
            .catch((error) => {
                console.error('Wystąpił problem podczas usuwania koszyka:', error.message);
            });


    }



    return (
        <div>
            <button type="button" onClick={handleBackToDevices}>Powrót do urządzeń</button>
            <button type="button" onClick={handleDeleteCart}>Opróżnij koszyk</button>
        </div>
    );
};

export default UserCartBar;
