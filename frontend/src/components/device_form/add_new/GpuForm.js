import React, {useEffect, useState} from "react";

function StorageForm(props){


    const [formData, setFormData] = useState({

        name: '',
        price: '',
        amount:'',
        producent: '',
        arrangement: '',
        memory: '',
        memoryType: '',
        cache: '',
        conector: '',
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

    };

    const handleAddGpu = () =>{

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
                    Układ
                    <input
                        className="form-input"
                        type="text"
                        name="arragement"
                        value={formData.arrangement}
                        onChange={handleChange}
                    />
                </label>
                <label className="form-label">
                    Pamięć
                    <input
                        className="form-input"
                        type="text"
                        name="memory"
                        value={formData.memory}
                        onChange={handleChange}
                    />
                </label>
                <label className="form-label">
                    Rodzaj pamięci
                    <input
                        className="form-input"
                        type="number"
                        name="mamoryType"
                        value={formData.memoryType}
                        onChange={handleChange}
                    />
                </label>
                <label className="form-label">
                    Złącza
                    <input
                        className="form-input"
                        type="text"
                        name="conector"
                        value={formData.conector}
                        onChange={handleChange}
                    />
                </label>

            <div className="form-buttons">

                <button className="add-button" onClick={handleAddGpu}>
                    Dodaj kartę graficzną
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
