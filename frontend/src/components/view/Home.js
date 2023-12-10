import React, {useEffect, useState} from 'react';
import { ReactTableScroll } from 'react-table-scroll';
import { Container } from "react-bootstrap";
import './Home.css'
import AdminManageDevices from "../bar/AdminManageDevices";
import {useLocation} from 'react-router-dom';
const Home = () => {

    const {state} = useLocation();
    const isAdmin = state?.isAdmin || false;

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
                url = 'http://localhost:8080/cpus/all';

        }

        fetch(url)
            .then(response =>response.json())
            .then(data => setComponents(data))
            .catch(error => console.error("Error fetchin data:",error));
    }

    const headersMap ={
        cpu: ['ID', 'Nazwa', 'Cena', 'Ilość', 'Producent', 'Socket', 'Taktowanie', 'Liczba rdzeni', 'Cache', 'Zintegrowany układ graficzny', ],
        gpu: ['ID', 'Nazwa', 'Cena', 'Ilość', 'Producent', 'Układ', 'Pamięć', 'Rodzaj pamięci', 'Złącza'],
        storage: ['ID', 'Nazwa', 'Cena', 'Ilość', 'Producent', 'Pojemność', 'Interfejs', 'Prędkość odczytu', 'Prędkość zapisu'],
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
                        {/*<td>{device.deviceName}</td>*/}
                        {/*<td>{device.price} zł</td>*/}
                        {/*<td>{device.description}</td>*/}
                        {/*<td>{device.age}</td>*/}
                        {/*<td>{device.office.address}</td>*/}
                        {/*<td>{device.readyToSell ? 'Tak' : 'Nie'}</td>*/}

                        <td>
                            <button onClick={() => handleDelete(component.id)}>Usuń</button>
                            <button onClick={() => handleEdit(component.id)}>Modyfikuj</button>
                        </td>
                    </>
                );
            case 'gpu':
                return (
                    <>
                        <td>{component.id}</td>
                        {/*<td>{device.deviceName}</td>*/}
                        {/*<td>{device.price} zł</td>*/}
                        {/*<td>{device.description}</td>*/}
                        {/*<td>{device.age}</td>*/}
                        {/*<td>{device.office.address}</td>*/}
                        {/*<td>{device.readyToSell ? 'Tak' : 'Nie'}</td>*/}
                        {/*<td>{device.serialNumber}</td>*/}
                        {/*<td>{device.operatingSystem}</td>*/}
                        {/*<td>{device.batteryLife}</td>*/}
                        {/*<td>{device.model}</td>*/}
                        {/*<td>{device.cpu ? device.cpu.name : 'Brak'}</td>*/}
                        {/*<td>{device.storage ? device.storage.name : 'Brak'}</td>*/}
                        {/*<td>{device.ram ? device.storage.name : 'Brak'}</td>*/}
                        <td>
                            <button onClick={() => handleDelete(component.id)}>Usuń</button>
                            <button onClick={() => handleEdit(component.id)}>Modyfikuj</button>
                        </td>
                    </>
                );
            case 'storage':

                return (
                    <>
                        <td>{component.id}</td>
                        <td>
                            <button onClick={() => handleDelete(component.id)}>Usuń</button>
                            <button onClick={() => handleEdit(component.id)}>Modyfikuj</button>

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