import './Locations.css'
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Surfcard from './Surfcard';


export default function Locations() {

    const [userName, setUserName] = useState('');
    const [locationData, setLocationData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [geoName, setGeoName] = useState('');

    const currentDate = dayjs();

    const getUserName = async () => {
        try{
            let response = await fetch('/api/login', {
                method: "GET",
            });
            if (response.ok) {
                let data = await response.json();
                setUserName(data.name);
            }
        } catch (error) {
            console.error(error)
        }
    }

    const getLocationData = async () => {
        try{
            let response = await fetch('/api/locations', {
                method: "GET",
            });
            if (response.ok){
                let data = await response.json();
                if (data.message){
                    return;
                } else {
                    setLocationData(data);
                }
            } else {
                alert('something went wrong fetching your location data :(')
            }
        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect(() => {
        getUserName();
        getLocationData();
    }, [])

    const handleNewLocation = async () => {
        try{

        } catch (error) {

        }
    }

    return (
        <>
            <div className='locationMain'>
                <div className='content'>
                    <h3 className='headerLocationSmall'>{userName}'s Profile</h3>
                    <h2 className='headerLocationLarge'>Surf Conditions - <span className='daySpan'>{currentDate.format('dddd, MMM D')}</span></h2>
                    <button onClick={() => setModalOpen(true)}>Create new!</button>
                    <div className='cardContainer'>
                        {locationData.length === 0 ? (
                            <h4>No locations yet :/</h4>
                        ) : (
                            locationData.map((el) => (
                                <Surfcard key={el.id} title={el.title} description={el.description} id={el.id} />
                            ))
                        )}
                    </div>
                </div>
            </div>
            {modalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <span className="close-button" onClick={() => setModalOpen(false)}>
                            &times;
                        </span>
                        <form className='modalForm' onSubmit={handleNewLocation}>
                            <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder='title' />
                            <input onChange={(e) => setGeoName(e.target.value)} value={geoName} type="text" placeholder='geoName' />
                            <textarea onChange={(e) => setDescription(e.target.value)} placeholder="Description"></textarea>
                            <button type="submit">Create</button>
                        </form>
                        <h4>{`title: ${title}, description:  ${description}, geoName: ${geoName}`}</h4>
                    </div>
                </div>
            )}

        </>

    );
}