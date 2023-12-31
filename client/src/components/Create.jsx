import { useState, useEffect } from "react";
import { FaSearchLocation } from 'react-icons/fa';

import './Create.css';

export default function CreateButton () {

    const [modalOpen, setModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');

    const setCoordinates = async (currCity, currCountry) => {
        try {
            let response = await fetch(`https://api.api-ninjas.com/v1/geocoding?city=${currCity}&country=${currCountry}`, {
                method: "GET",
                headers: {
                    'X-Api-Key': 'hlacNj0HiuchakfyKYAmqQ==nlPj4sw4zM0v9YwN'
                },
            })
            let data = await response.json();
            let coordinates = [data[0].latitude, data[0].longitude];
            return coordinates;
        } catch (error) {
            console.error(error);
        }
    }

    const handleNewLocation = async (e) => {
        e.preventDefault();
        try {
            let coords = await setCoordinates(city, country);
            let response = await fetch('/api/locations', {
                method: "POST",
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    title: title,
                    description: description,
                    lat: coords[0],
                    long: coords[1]
                })
            })
            if (response.ok){
                console.log(response);
                window.location.reload();
            } else {
                console.log("something went wrong :(((")
            }
            setModalOpen(false);
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
            <button className="faLocation" onClick={() => setModalOpen(true)}><FaSearchLocation /></button>
            {modalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <span className="close-button" onClick={() => setModalOpen(false)}>
                            &times;
                        </span>
                        <form className='modalForm' onSubmit={handleNewLocation}>
                            <label className="createLabel">Name</label>
                            <input className="inputCreate" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="ie: Salt Creek" />
                            <label className="createLabel">Description</label>
                            <input className="inputCreate" type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="ie: love this spot!" />
                            <label className="createLabel"><span className='astericNew'>*</span>City <span className="countryCode">(of surf location)</span></label>
                            <input className="inputCreate" type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="ie: Santa Cruz" />
                            <label className="createLabel"><span className='astericNew'>*</span>Country <span className="countryCode">(3 letter code)</span></label>
                            <input className="inputCreate" type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="ie: USA" />
                            <button className="modalButton" type="submit" >Create</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}