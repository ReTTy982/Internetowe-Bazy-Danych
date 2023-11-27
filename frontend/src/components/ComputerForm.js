import React, {useEffect, useState} from "react";
import './ComputerForm.css'
function ComputerForm(props){

    const [formData, setFormData] = useState({

        deviceName: '',
        price: '',
        description:'',
        serialNumber: '',
        model: '',
        operatingSystem: '',
        batteryLife: '',
        cpu: '',
        storage: '',
        ram: ''
    });



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

    };


    const handleAddComputer = () =>{

    };

    return (props.trigger) ? (

        <div className="popup">
            <div className="popup-inner">
                <h2>Dodaj Komputer</h2>
                <form className="computer-form">
                    <div className="form-column-left">

                        <label className="form-label">
                            Nazwa
                        <input
                            className="form-input"
                            type="text"
                            name="deviceName"
                            value={formData.deviceName}
                            onChange={handleChange}
                            />
                        </label>
                        <label className="form-label">
                            Cena
                            <input
                                className="form-input"
                                type="double"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                            />
                        </label>
                        <label className="form-label">
                            Opis
                            <input
                                className="form-input"
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </label>
                        <label className="form-label">
                            Numer seryjny
                            <input
                                className="form-input"
                                type="text"
                                name="serialNumber"
                                value={formData.serialNumber}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div className="form-column-right">
                        <label className="form-label">
                            System operacyjny
                            <input
                                className="form-input"
                                type="text"
                                name="operatingSystem"
                                value={formData.operatingSystem}
                                onChange={handleChange}
                            />
                        </label>
                        <label className="form-label">
                            Żywotność baterii
                            <input
                                className="form-input"
                                type="int"
                                name="battery"
                                value={formData.batteryLife}
                                onChange={handleChange}
                            />
                        </label>
                        <label className="form-label">
                            Model
                            <input
                                className="form-input"
                                type="text"
                                name="model"
                                value={formData.model}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div className="form-buttons">
                        <button className="close-btn" onClick={() => props.setTrigger(false)}>
                            Zamknij
                        </button>
                        {props.children}
                        <button className="add-button" onClick={handleAddComputer}>
                            Dodaj komputer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    ) : "";
}

export default ComputerForm
