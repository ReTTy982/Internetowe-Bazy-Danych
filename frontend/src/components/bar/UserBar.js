import React, { useState } from 'react';
import FormPopup from "../device_form/FormPopup";
import {useNavigate} from 'react-router-dom'
const UserBar = ({ onSidebarChange }) => {
    const [addFormPopup, setAddFormPopup] = useState(false);
    const navigate = useNavigate();


    const handleDisplayCart = () =>{

    }

    const handleDisplayOrder = () =>{

    }


    return (
        <div>
            <button type="button" onClick={handleDisplayCart}>Wyświetl koszyk</button>
            <button type="button" onClick={handleDisplayOrder}>Historia zamówień</button>
        </div>
    );
};

export default UserBar;
