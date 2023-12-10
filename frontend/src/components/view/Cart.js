import React, {useEffect, useState} from 'react';
import { ReactTableScroll } from 'react-table-scroll';
import { Container } from "react-bootstrap";
import ManageUserBar from "../bar/ManageUserBar";
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import UserCartBar from "../bar/UserCartBar";

const user_id = localStorage.getItem("user_id");

const Cart = (id) =>{

    const [carts, setCarts] = useState([]);
    const fetchCarts = () => {
        const user_id = localStorage.getItem('user_id');

        axios.post('http://127.0.0.1:8000/viewCart', {
            customer: user_id,
        })
            .then(response => {
                const data = response.data;

                console.log('Odpowiedź serwera:', data);
                setCarts(data);
            })
            .catch(error => {
                console.error('Błąd podczas wysyłania żądania:', error);
            });
    }

    const handleDeleteCart = (id) =>{

        axios.delete('http://127.0.0.1:8000/deleteCartItem', {
            data: {
                id: id,
            },
            headers: {
                'Content-type': 'application/json;',
            },
        })
            .then((response) => {
                console.log('Koszyk został pomyślnie usunięty.');
            })
            .catch((error) => {
                console.error('Wystąpił problem podczas usuwania koszyka:', error.message);
            });

        const updatedCarts = carts.filter((cart) => cart.id !== id);
        setCarts(updatedCarts);

    }


    const renderCartData = (cart) => {

        return(
            <>
                <td>{cart.product}</td>
                <td>{cart.amount}</td>
                <td>{cart.price} zł</td>
                <td>
                    <button onClick={() => handleDeleteCart(cart.id)}> Usuń zamówienie</button>
                </td>
            </>
        )
    }

    useEffect(() =>{
        fetchCarts();
    }, []);

    return (

        <Container>
            {/*<AdminManageDevices onSidebarClick={handleSidebarClick} onAddComputerClick={handleAddComputerClick}/>*/}
            <div className="outer-position">

                <div className="header-block">
                    Koszyk
                </div>
                <div className="operation-block">
                    <UserCartBar/>
                </div>
                <div className="table-container">
                    <ReactTableScroll className="styled-table">
                        <table className="device table styled-table">
                            <thead>
                            <td>Produkt</td>
                            <td>Ilość</td>
                            <td>Cena</td>

                            </thead>

                            <tbody>
                            {carts.map((cart) => (
                                <tr key={cart.id}>
                                    {renderCartData(cart)}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </ReactTableScroll>
                </div>
            </div>
        </Container>

    )




};

export default Cart;