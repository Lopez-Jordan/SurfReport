import { useState, useEffect } from "react";
import './Create.css';

export default function CreateButton ({ refetch, setRefetch}) {

    const [modalOpen, setModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);

    const setCoordinates = async () => {
        try {
            let response = await fetch(`https://api.api-ninjas.com/v1/geocoding?city=${city}&country=${country}`, {
                method: "GET",
                headers: {
                    'X-Api-Key': 'hlacNj0HiuchakfyKYAmqQ==nlPj4sw4zM0v9YwN'
                },
            })
            let data = await response.json();
            setLat(data[0].latitude);
            setLong(data[0].longitude);
        } catch (error) {
            console.error(error);
        }
    }

    const handleNewLocation = async (e) => {
        e.preventDefault();
        try {
            await setCoordinates();
            alert(`${title}, ${description}, ${city}, ${country}, ${lat}, ${long}`);

            // then 
            // then post a new location

            // setRefetch(!refetch);
    
            
            // setModalOpen(false);
            // window.location.reload();
            setTitle('');
            setDescription('')
            setCity('');
            setCountry('');


        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <button onClick={() => setModalOpen(true)}>Create</button>
            {modalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <span className="close-button" onClick={() => setModalOpen(false)}>
                            &times;
                        </span>
                        <form className='modalForm' onSubmit={handleNewLocation}>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="title goes here" />
                            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="description goes here" />
                            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="city goes here" />
                            <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="country goes here" />


                            <button type="submit" >Create</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}