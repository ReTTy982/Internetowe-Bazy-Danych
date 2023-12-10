import React, {useEffect, useState} from "react";
import './DeviceForm.css'
import CpuForm from "./add_new/CpuForm";
import GpuForm from "./add_new/GpuForm";
import StorageForm from "./add_new/StorageForm";
import axios from "axios";


function AddToCartPopup(props){

    const user_id = localStorage.getItem("user_id");
    const product_id = localStorage.getItem("product_id")

    const[formData, setFormData] = useState({

       amount: '',

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

    };

    const handleAddToCart = async (e) => {
        // e.preventDefault();
        // console.log(product_id);
        // console.log(formData.amount);

        try {
            const response = await axios.post('http://127.0.0.1:8000/addToCart', {
                customer_id: user_id,
                product_id: product_id,
                amount: formData.amount
            });



            // Tutaj możesz dodać kod obsługujący odpowiedź, jeśli to konieczne.
        } catch (error) {
            console.error('Błąd podczas wysyłania żądania:', error);
        }
    };



    return (props.trigger) ? (

        <div className="popup">
            <form className="component-form">
                <label className="form-label">
                    Wybierz ilość:
                    <input
                        className="form-input"
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                    />
                </label>
                <div>
                    {props.children}
                </div>
                <div className="form-buttons">

                    <button className="add-button" onClick={handleAddToCart}>
                        Dodaj do koszyka
                    </button>
                    <button className="close-btn" onClick={() => props.setTrigger(false)}>
                        Zamknij
                    </button>
                </div>

            </form>
        </div>
    ) : "";
}

export default AddToCartPopup