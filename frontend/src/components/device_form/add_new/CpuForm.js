import React, {useEffect, useState} from "react";

function CpuForm(props){


    const [formData, setFormData] = useState({

        name: '',
        price: '',
        amount:'',
        producent: '',
        socket: false,
        clockRate: '',
        numberOfCores: '',
        cache: '',
        integra: '',
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

    };

    const handleAddCpu = () =>{

    };

    return(
    <div className="popup-inner">
        {/*<div className='popup-header'>Dodaj procesor</div>*/}
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
                    Socket
                    <input
                        className="form-input"
                        type="text"
                        name="socket"
                        value={formData.socket}
                        onChange={handleChange}
                    />
                </label>
                <label className="form-label">
                    Taktowanie
                    <input
                        className="form-input"
                        type="text"
                        name="clockRate"
                        value={formData.clockRate}
                        onChange={handleChange}
                    />
                </label>
                <label className="form-label">
                    Liczba rdzeni
                    <input
                        className="form-input"
                        type="number"
                        name="numberOfCores"
                        value={formData.numberOfCores}
                        onChange={handleChange}
                    />
                </label>
                <label className="form-label">
                    Cache
                    <input
                        className="form-input"
                        type="text"
                        name="cache"
                        value={formData.cache}
                        onChange={handleChange}
                    />
                </label>
                <label className="form-label">
                    Zintegrowanu układ graficzny
                    <input
                        className="form-input"
                        type="text"
                        name="integra"
                        value={formData.integra}
                        onChange={handleChange}
                    />
                </label>

            <div className="form-buttons">

                <button className="add-button" onClick={handleAddCpu}>
                    Dodaj procesor
                </button>
                <button className="close-btn" onClick={() => props.setTrigger(false)}>
                    Zamknij
                </button>
            </div>
        </form>
    </div>
    );
}

export default CpuForm;
