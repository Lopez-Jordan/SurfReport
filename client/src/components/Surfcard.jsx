import React, { useState, useEffect, useContext } from 'react';
import { FaRegEdit, FaRegTrashAlt, FaRegClock, FaWater, FaRegCompass } from 'react-icons/fa';
import './Surfcard.css';
import { LogInContext } from "../App";

export default function Surfcard({ title, description, id, lat, long }) {

    const [loggedIn, setLoggedIn] = useContext(LogInContext);
    const [modalOpen, setModalOpen] = useState(false);
    const [updateTitle, setUpdateTitle] = useState(title);
    const [updateDescription, setUpdateDescription] = useState(description);
    const [waveHeight, setWaveHeight] = useState(null);
    const [wavePeriod, setWavePeriod] = useState(null);
    const [waveDirection, setWaveDirection] = useState(null);



    const handleUpdate = async (e) => {
        try{
            e.preventDefault();
            let response = await fetch(`/api/locations/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: updateTitle,
                    description: updateDescription
                }),
            });
            if (response.ok){
                window.location.reload();
            }
            else{
                alert('something went wrong, try again');
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        
        const shouldDelete = window.confirm("Are you sure you want to delete?");
    
        if (shouldDelete) {
            try {
                let response = await fetch(`/api/locations/${id}`, {
                    method: "DELETE",
                });
                if (response.ok) {
                    alert('Successful deletion!');
                    window.location.reload();
                } else {
                    alert('Something went wrong, try again');
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    function degreesToCardinal(degrees) {
        const cardinalDirections = ['North', 'North East', 'East', 'South East', 'South', 'South West', 'West', 'North West'];
        const index = Math.round((degrees % 360) / 45) % 8;
        return cardinalDirections[index];
    }
    function avgWave(inputArr){
        let total = 0
        let num = 0;
        for(let el of inputArr){
          num++;
          total += el;
        }
        return total/num;
    }
    const getWaveData = async (latitude, longitude) => {
        try {
            let response = await fetch('https://api.windy.com/api/point-forecast/v2', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    lat: latitude,
                    lon: longitude,
                    model: "gfsWave",
                    parameters: ["waves"],
                    key: "Eo25N5d4bTDvvFyP1JteaSMFMbFV9giA"
                })
            });
            const data = await response.json();

            if (response.ok) {
                const newWaveHeight = avgWave(data["waves_height-surface"]) * 3.28084;
                const newWavePeriod = avgWave(data["waves_period-surface"]);
                const newWaveDirection = degreesToCardinal(avgWave(data["waves_direction-surface"]));
                setWaveHeight(newWaveHeight);
                setWavePeriod(newWavePeriod);
                setWaveDirection(newWaveDirection);
            } else {
                alert("Something went wrong :/")
            }
        } catch (error) {
            console.error(error);
        }
    }



    useEffect(() => {
        getWaveData(lat, long);
    }, [loggedIn]);

    return (
        <>
            <div className="cardDiv">
                <div className="headerDiv">
                    <h4 className="headerCard">{title}</h4>
                    <div className="twoButtons">
                        <button className="good" onClick={() => setModalOpen(true)}>
                            <FaRegEdit />
                        </button>
                        <button className="danger" onClick={handleDelete}>
                            <FaRegTrashAlt />
                        </button>
                    </div>
                </div>
                <div className="surfInfo">
                    <p className="surfData1">{Math.floor(waveHeight)}-{Math.floor(waveHeight) + 1} ft <FaWater className='faIcon' /></p>
                    <p className="surfData">{Math.floor(wavePeriod)} sec <FaRegClock className='faIcon' /></p>
                    <p className="surfData">{waveDirection} <FaRegCompass className='faIcon' /></p>
                </div>
                <p className="paraCard">{description}</p>

            </div>

            {modalOpen && (
                <div className="modal-overlay">
                    <div className="modalUpdate">
                        <span className="close-button" onClick={() => setModalOpen(false)}>
                            &times;
                        </span>
                        <form className='modalForm' onSubmit={handleUpdate}>
                            <div className='inputFlex'>
                                <input onChange={(e) => setUpdateTitle(e.target.value)} type="text" className="modalInput" value={updateTitle} />
                            </div>
                            <div className='inputFlex'>
                                <textarea onChange={(e) => setUpdateDescription(e.target.value)} className="modalTextarea" placeholder="Description" value={updateDescription}></textarea>
                            </div>
                            <button className="modalButton" type="submit">update</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
