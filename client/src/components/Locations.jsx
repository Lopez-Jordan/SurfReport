import './Locations.css'
import { useEffect, useState, useContext } from 'react';
import dayjs from 'dayjs';
import Surfcard from './Surfcard';
import CreateButton from './Create';
import { LogInContext } from "../App";



export default function Locations() {

    const [loggedIn, setLoggedIn] = useContext(LogInContext);
    const [userName, setUserName] = useState('');
    const [locationData, setLocationData] = useState([]);

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
    }, [loggedIn])

    return (
        <>
            <div className='locationMain'>
                <div className='content'>
                    <div className='flexDiv'>
                    <h3 className='headerLocationSmall'>{userName}'s report</h3>
                        <p className='dayDiv'>{currentDate.format('dddd, MMM D')}</p>
                        <CreateButton/>
                    </div>
                    <div className='cardContainer'>
                        {locationData.length === 0 ? (
                            <p style={{marginTop: '40px'}}>Click on the search icon to generate a custom surf report!</p>
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