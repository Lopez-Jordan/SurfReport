import './Locations.css'
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Surfcard from './Surfcard';
import CreateButton from './Create';


export default function Locations() {

    const [userName, setUserName] = useState('');
    const [locationData, setLocationData] = useState([]);
    const [refetch, setRefetch] = useState(false);

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
    }, [refetch])

    return (
        <>
            <div className='locationMain'>
                <div className='content'>
                    <h3 className='headerLocationSmall'>{userName}'s Profile</h3>
                    <h2 className='headerLocationLarge'>Surf Conditions - <span className='daySpan'>{currentDate.format('dddd, MMM D')}</span></h2>
                    <CreateButton refetch={refetch} setRefetch={setRefetch}/>
                    <div className='cardContainer'>
                        {locationData.length === 0 ? (
                            <h4>No locations yet :/</h4>
                        ) : (
                            locationData.map((el) => (
                                <Surfcard key={el.id} title={el.title} description={el.description} id={el.id} lat={el.lat} long={el.long} />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>

    );
}