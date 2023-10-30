import { useState, useEffect } from "react";
import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const [loggedIn, setLoggedIn] = useState(null);

    const checkLogin = async () => {
        let response = await fetch('/api/login');
        if (response.ok) {
            const data = await response.json();
            console.log(data);
        } else {
            console.log('nope')
        }
    };

    useEffect(() => {
        checkLogin();
    }, []);

    return (
        <div>
            <h1>navbar</h1>
        </div>
      );
}
