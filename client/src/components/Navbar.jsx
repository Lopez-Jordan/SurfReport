import { useState, useEffect } from "react";
import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const [loggedIn, setLoggedIn] = useState(null);

    useEffect(() => {
        checkLogin();
    }, []);

    const checkLogin = async () => {
        let response = await fetch('/api/login');
        if (response.ok) {
            const data = await response.json();
            if (data.loggedIn == true){
                console.log(data.loggedIn);
                setLoggedIn(true);
            } else {
                console.log(data.loggedIn);

                setLoggedIn(false);
            }
        }
    };

    const handleLogout = async () => {
        // make a post request to /api/logout
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
