import React, {useEffect, useState} from "react";

function StorageForm(props){


    const [formData, setFormData] = useState({

        name: '',
        price: '',
        amount:'',
        producent: '',
        capacity: '',
        interface: '',
        writeSpeed: '',
        readSpeed: '',
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

    };

    const handleAddStorage = () =>{

    };

    return(
    <div className="popup-inner">
        <form className="component-form">
                <label className="form-label">
                    Nazwa
                    <input
                        className="form-input"
                        type="text"
                        name="deviceName"
                        value={formData.name}
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
                    ilość
                    <input
                        className="form-input"
                        type="text"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                    />
                </label>
                <label className="form-label">
                    Pruducent
                    <input
                        className="form-input"
                        type="text"
                        name="producent"
                        value={formData.producent}
                        onChange={handleChange}
                    />
                </label>
                <label className="form-label">
                    Pojemność
                    <input
                        className="form-input"
                        type="text"
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleChange}
                    />
                </label>
                <label className="form-label">
                    Interfejs
                    <input
                        className="form-input"
                        type="text"
                        name="interface"
                        value={formData.interface}
                        onChange={handleChange}
                    />
                </label>
                <label className="form-label">
                    Prędkość zapisu
                    <input
                        className="form-input"
                        type="number"
                        name="writeSpeed"
                        value={formData.writeSpeed}
                        onChange={handleChange}
                    />
                </label>
                <label className="form-label">
                    Prędkość odczytu
                    <input
                        className="form-input"
                        type="text"
                        name="readSpeed"
                        value={formData.readSpeed}
                        onChange={handleChange}
                    />
                </label>

            <div className="form-buttons">

                <button className="add-button" onClick={handleAddStorage}>
                    Dodaj dysk pamięci
                </button>
                <button className="close-btn" onClick={() => props.setTrigger(false)}>
                    Zamknij
                </button>
            </div>
        </form>
    </div>
    );
}

export default StorageForm;
