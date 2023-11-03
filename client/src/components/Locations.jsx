import './Locations.css'
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Surfcard from './Surfcard';


export default function Locations() {

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
                setLocationData(data);
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
    },[])

    return (
        <>
            <div className='locationMain'>
                <div className='content'>
                    <h1>{userName}'s report for <span>{currentDate.format('dddd, MMM D')}</span></h1>
                    <div className='cardContainer'>
                        {locationData.map((el)=>{
                            return <Surfcard key={el.id} title={el.title} description={el.description} id={el.id}/>
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}