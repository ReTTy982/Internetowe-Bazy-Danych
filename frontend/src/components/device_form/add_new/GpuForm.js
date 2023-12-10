import React, {useEffect, useState} from "react";
import axios from "axios";

function StorageForm(props){


    const [formData, setFormData] = useState({

        name: '',
        price: '',
        amount:'',
        producent: '',
        arragement: '',
        memory: '',
        memoryType: '',
        cache: '',
        conector: '',
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

    };

    const handleAddGpu = async () => {

        try {
            const token = sessionStorage.getItem('authtoken');

            // if (!token) {
            //     console.error('Brak tokena');
            //     return;
            // }

            const gpuData = {
                "category_name": "Karty Graficzne",
                "product_meta": {
                    "data": {
                        "arragement": formData.arrangement,
                        "memory": formData.memory,
                        "memoryType": formData.memoryType,
                        "cache": formData.cache,
                        "conector": formData.conector
                    }
                },
                "product_name": formData.name,
                "amount": formData.amount,
                "price": formData.price,
                "producer": formData.producent

            };

            const response = await axios.post('http://127.0.0.1:8000/addProduct', gpuData, {
                // headers: {
                //     Authorization: `Token ${token}`,
                //     'Content-Type': 'application/json',
                // },
            });

            if (response.data.success) {
                console.log('Procesor dodany pomyślnie');
            } else {
                console.error('Błąd dodawania procesora');
            }
        } catch (error) {
            console.error('Błąd dodawania procesora:', error);
        }


    };

    return(
    <div className="popup-inner">
        <form className="component-form">
                <label className="form-label">
                    Nazwa
                    <input
                        className="form-input"
                        type="text"
                        name="name"
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
                        type="text"
                        name="memoryType"
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
