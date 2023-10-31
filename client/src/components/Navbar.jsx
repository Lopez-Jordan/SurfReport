import { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import { LogInContext } from "../App";
import './Navbar.css';

export default function Navbar() {

    const [loggedIn, setLoggedIn] = useContext(LogInContext);

    const handleLogout = async () => {
        if (confirm('are you sure you want to logout?')){
            let response = await fetch('/api/logout', {
                method: 'POST'
            });
            if (response.ok){
                setLoggedIn(false);
                alert('you are now logged out!')
            } else {
                alert('something went wrong :( try again')
            }
        } else {
            return false;
        }
    }

    return (
        <>
            <div className="navbar">
                {(loggedIn) ? (
                    <>
                        <Link to='/'>Home</Link>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to='/'>Home</Link>
                        <Link to='/login'>Login</Link>
                        <Link to='/signup'>Signup</Link>
                    </>
                )}
            </div>
        </>
      );
}
