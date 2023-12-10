import React, {useEffect, useState} from "react";
import './DeviceForm.css'
import CpuForm from "./add_new/CpuForm";
import GpuForm from "./add_new/GpuForm";
import StorageForm from "./add_new/StorageForm";


function AddToCartPopup(props, id){


    const[formData, setFormData] = useState({

       amount: '',

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

    };

    const handleAddToCart = () => {


    }


    return (props.trigger) ? (

        <div className="popup">
            <form className="component-form">
                <label className="form-label">
                    Wybierz ilość:
                    <input
                        className="form-input"
                        type="text"
                        name="name"
                        value={formData.name}
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