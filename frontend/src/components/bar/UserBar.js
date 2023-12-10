import React, { useState } from 'react';
import FormPopup from "../device_form/FormPopup";
import {useNavigate} from 'react-router-dom'
const UserBar = ({ onSidebarChange }) => {
    const [addFormPopup, setAddFormPopup] = useState(false);
    const navigate = useNavigate();
    const [selectedString, setSelectedString] = useState('Procesory');
    const stringList = ['Procesory', 'Karty graficzne', 'Dyski pamięci'];

    const optionToStateMap = {
        'Procesory': 'cpu',
        'Karty graficzne': 'gpu',
        'Dyski pamięci': 'storage',
    };


    const handleSelectChange = (event) => {
        const selectedString = event.target.value;
        const selectedState = optionToStateMap[selectedString];
        setSelectedString(selectedString);
        onSidebarChange(selectedState);
    };

    const handleDisplayCart = () =>{

    }

    const handleDisplayOrder = () =>{

    }



    return (
        <div>
            <select value={selectedString} onChange={handleSelectChange}>
                {stringList.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            <button type="button" onClick={handleDisplayCart}>Wyświetl koszyk</button>
            <button type="button" onClick={handleDisplayOrder}>Historia zamówień</button>
        </div>
    );
};

export default UserBar;
