import React, {useEffect, useState} from "react";
import './DeviceForm.css'
import CpuForm from "./device_form/CpuForm"
import StorageForm from "./device_form/StorageForm";
import GpuForm from "./device_form/GpuForm";
function FormPopup(props){

    const [selectedString, setSelectedString] = useState('Procesor');
    const stringList = ['Procesor', 'Karta graficzna', 'Dysk pamięci'];


    const handleSelectChange = (event) => {
        const selectedString = event.target.value;
        setSelectedString(selectedString);
    };


    return (props.trigger) ? (

        <div className="popup">
            <div className='component-form'>
                <div className='popup-select'>
                <div className>Dodaj</div>
                <select value={selectedString} onChange={handleSelectChange}>
                    {stringList.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                </div>
            </div>
            <div>
                {selectedString === 'Procesor' && <CpuForm setTrigger={props.setTrigger} />}
                {selectedString === 'Karta graficzna' && <GpuForm setTrigger={props.setTrigger} />}
                {selectedString === 'Dysk pamięci' && <StorageForm setTrigger={props.setTrigger} />}
                {props.children}
            </div>
        </div>
    ) : "";
}

export default FormPopup
