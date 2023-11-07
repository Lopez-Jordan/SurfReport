import './Home.css';
import { useState, useContext, useEffect } from "react";
import Secondary from '../components/Secondary';
import Locations from '../components/Locations';
import { LogInContext } from "../App";

export default function Home() {
    const [loggedIn, setLoggedIn] = useContext(LogInContext);

    useEffect(() => {
        if (loggedIn) {
            window.scrollTo(0, document.body.scrollHeight);
        }
    }, [loggedIn]);

    return (
        <>
            <div className="main">
                <h1 className="header">Surf Report</h1>
                <div className='para'>
                    <div className='numberLetter'>
                        <h4>1</h4>
                        <p>Login or Signup</p>
                    </div>
                    <div className='numberLetter'>
                        <h4>2</h4>
                        <p>Choose any coastal city you want a surf report for</p>
                    </div>
                    <div className='numberLetter2'>
                        <h4>3</h4>
                        <p>Monitor conditions for many locations before you surf!</p>
                    </div>
                </div>
            </div>
            <Secondary />
            {(loggedIn) &&
                <Locations />
            }
        </>
    )
}
