import React, { useState } from 'react';
import FormPopup from "../device_form/FormPopup";
import {useNavigate} from 'react-router-dom'
const AdminManageDevices = ({ onSidebarChange }) => {
    const [selectedString, setSelectedString] = useState('Procesory');
    const stringList = ['Procesory', 'Karty graficzne', 'Dyski pamięci'];
    const [addFormPopup, setAddFormPopup] = useState(false);
    const navigate = useNavigate();

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

    const handleAddComponent = () =>{
        setAddFormPopup(true);

    };

    const handleDisplayUsers = () =>{
        navigate("/users")
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
            <button type="button" onClick={handleAddComponent}>Dodaj urządzenie</button>
            <button type="button" onClick={handleDisplayUsers}>Zarządzaj użytkownikami</button>
            <FormPopup trigger={addFormPopup} setTrigger={setAddFormPopup}></FormPopup>
        </div>
    );
};

export default AdminManageDevices;
