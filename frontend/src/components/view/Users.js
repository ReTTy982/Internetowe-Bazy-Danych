import React, {useEffect, useState} from 'react';
import { ReactTableScroll } from 'react-table-scroll';
import { Container } from "react-bootstrap";
import ManageUserBar from "../bar/ManageUserBar";
import {useNavigate} from 'react-router-dom'


const Users = () =>{

    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const fetchUsers = () =>{

        fetch('http://127.0.0.1:8000/viewAllCustomers')
            .then(response =>response.json())
            .then(data => setUsers(data))
            .catch(error => console.error("Error fetchin data:",error));
    }

    const handleDisplayUserCart = (userId) =>{

        localStorage.setItem("user_id", userId);
        navigate('/cart');


    }

    const handleDisplayUserOrder = (userId) =>{

    }

    const handleDeleteUser = (userId) =>{

    }


    const renderUsersData = (user) => {

        return(
            <>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                    <button onClick={() => handleDisplayUserCart(user.id)}> Wyświetl koszyk</button>
                </td>
                <td>
                    <button onClick={() => handleDisplayUserOrder(user.id)}> Wyświetl zamówienia</button>
                </td>
                <td>
                    <button onClick={() => handleDeleteUser(user.id)}> Usuń użytkownika</button>
                </td>
            </>
        )
    }

    useEffect(() =>{
      fetchUsers();
    }, []);

    return (

        <Container>
            {/*<AdminManageDevices onSidebarClick={handleSidebarClick} onAddComputerClick={handleAddComputerClick}/>*/}
            <div className="outer-position">

                <div className="header-block">
                    Panel administracyjny, zarządzanie użytkownikami
                </div>
                <div className="operation-block">
                    <ManageUserBar/>
                </div>
                <div className="table-container">
                    <ReactTableScroll className="styled-table">
                        <table className="device table styled-table">
                            <thead>
                            <td>ID</td>
                            <td>Username</td>
                            <td>Email</td>
                            <td>Wyświetl koszyk</td>
                            <td>Wyświetl zamówienie</td>
                            <td>Usuń użytkownika</td>
                            </thead>

                            <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    {renderUsersData(user)}
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

export default Users;