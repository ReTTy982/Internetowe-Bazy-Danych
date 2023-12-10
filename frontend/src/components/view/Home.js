import React, {useEffect, useState} from 'react';
import { ReactTableScroll } from 'react-table-scroll';
import { Container } from "react-bootstrap";
import './Home.css'
import AdminManageDevices from "../bar/AdminManageDevices";
import {useLocation} from 'react-router-dom';
const Home = () => {

    const {state} = useLocation();
    const isAdmin = localStorage.getItem('isAdmin')==='true';

    const [components, setComponents] = useState([]);
    const [selectedOption, setSelectedOption] = useState('cpu');
    // const [addComputerPopup, setAddComputerPopup] = useState(false);


    const fetchData = (option) =>{
        let url;

        switch (option){
            case 'cpu':
                url = 'http://127.0.0.1:8000/viewAllProcessors';
                break;
            case 'gpu':
                url = 'http://127.0.0.1:8000/viewAllGraphicCards';
                break;
            case 'storage':
                url = 'http://127.0.0.1:8000/viewAllDiscs';
                break;
            default:
                url = 'http://127.0.0.1:8000/viewAllProcessors';

        }

        fetch(url)
            .then(response =>response.json())
            .then(data => setComponents(data))
            .catch(error => console.error("Error fetchin data:",error));
    }

    const headersMap ={
        cpu: ['ID', 'Nazwa', 'Ilość', 'Cena', 'Producent', 'Cache', 'Socket', 'Zintegrowany układ graficzny', 'Taktowanie zegara', 'Liczba rdzeni' ],
        gpu: ['ID', 'Nazwa', 'Ilość', 'Cena', 'Producent', 'Cache','Pamięć', 'Złącza', 'Rodzaj pamięci'],
        storage: ['ID', 'Nazwa', 'Ilość', 'Cena', 'Producent', 'Pojemność', 'Interfejs', 'Prędkość odczytu', 'Prędkość zapisu'],
    };

    const handleSidebarChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };

    // const handleAddComputerClick = () =>{
    //     setAddComputerPopup(true)
    // };

    const renderDataForOption = (component, option) => {
        switch (option) {
            case 'cpu':
                return (
                    <>
                        <td>{component.id}</td>
                        <td>{component.product_name}</td>
                        <td>{component.amount} zł</td>
                        <td>{component.price}</td>
                        <td>{component.producer}</td>
                        <td>{component.data.cache}</td>
                        <td>{component.data.socket}</td>
                        <td>{component.data.integra}</td>
                        <td>{component.data.clockRate}</td>
                        <td>{component.data.numberOfCores}</td>

                        <td>
                            <button onClick={() => handleDelete(component.id)}>Usuń</button>
                        </td>
                    </>
                );
            case 'gpu':
                return (
                    <>
                        <td>{component.id}</td>
                        <td>{component.product_name}</td>
                        <td>{component.amount}</td>
                        <td>{component.price}</td>
                        <td>{component.producer}</td>
                        <td>{component.data.cache}</td>
                        <td>{component.data.memory}</td>
                        <td>{component.data.conector}</td>
                        <td>{component.data.memoryType}</td>

                        <td>
                            <button onClick={() => handleDelete(component.id)}>Usuń</button>
                        </td>
                    </>
                );
            case 'storage':

                return (
                    <>
                        <td>{component.id}</td>
                        <td>{component.product_name}</td>
                        <td>{component.amount}</td>
                        <td>{component.price}</td>
                        <td>{component.producer}</td>
                        <td>{component.data.capacity}</td>
                        <td>{component.data.interface}</td>
                        <td>{component.data.readSpeed}</td>
                        <td>{component.data.writeSpeed}</td>
                        <td>
                            <button onClick={() => handleDelete(component.id)}>Usuń</button>

                        </td>
                    </>
                );
            default:
                return null;
        }
    };


    useEffect(() => {
        fetchData(selectedOption);
    }, [selectedOption]);

    const handleDelete = (deviceId) => {

        // fetch(`http://localhost:8080/devices/${deviceId}`, {
        //     method: 'DELETE',
        //     headers: {
        //         'Content-type': 'application/json; charset=UTF-8',
        //     },
        // })
        //     .then((res) => {
        //         if (!res.ok) {
        //             throw new Error('Wystąpił problem podczas usuwania urządzenia.');
        //         }
        //         return res.json();
        //     })
        //     .then((data) => {
        //         console.log('Urządzenie zostało pomyślnie usunięte.');
        //     })
        //     .catch((err) => {
        //         console.error(err.message);
        //     });
        //
        // const updatedDevices = devices.filter((device) => device.id !== deviceId);
        // setDevices(updatedDevices);
    };

    const handleEdit = (deviceId) => {
        console.log(`Edytuj urządzenie o ID: ${deviceId}`);
    };

    const handleInfo = (deviceId) => {
        console.log(`Informacje o urządzeniu o ID: ${deviceId}`);
    };


    return (
        <Container>
                {/*<AdminManageDevices onSidebarClick={handleSidebarClick} onAddComputerClick={handleAddComputerClick}/>*/}
            <div className="outer-position">

                <div className="header-block">
                    Sklep procesorów, kart graficznych i pamięci
                </div>
                <div className="operation-block">
                    {console.log(isAdmin)}
                    {isAdmin && (
                        <AdminManageDevices onSidebarChange={handleSidebarChange}/>
                    )}

                </div>
                    <div className="table-container">
                    <ReactTableScroll className="styled-table">
                        <table className="device table styled-table">
                            <thead>
                            <tr key={selectedOption} className="table-header">
                                {headersMap[selectedOption].map((header, index) => (
                                    <td key={index}>{header}</td>
                                ))}
                                <td>Akcja</td>
                            </tr>
                            </thead>
                            <tbody>
                            {components.map((component) => (
                                <tr key={component.id}>
                                    {renderDataForOption(component, selectedOption)}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </ReactTableScroll>
                </div>
            </div>
                {/*<SidebarUserConfig/>*/}
            {/*<FormPopup trigger={addComputerPopup} setTrigger={setAddComputerPopup}></FormPopup>*/}
        </Container>
    );


};

export default Home;