import './Home.css';
import { useState, useContext } from "react";
import Secondary from '../components/Secondary';
import Locations from '../components/Locations';
import { LogInContext } from "../App";

export default function Home() {

    const [loggedIn, setLoggedIn] = useContext(LogInContext);

    return (
        <>
            <div className="main">
                <h1 className="header">Surf Report</h1>
                <p className='para'>A Surfline inspired, full stack application where users can track the conditions of their favorite surf spots and make informed decisions before
                ever leaving the house.</p>
            </div>
            <Secondary />
            {(loggedIn) && 
                <Locations />
            }
        </>

    )
}