import React, { useState, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { LogInContext } from "../App";


export default function Signup() {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useContext(LogInContext);

    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        let response = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name : userName,
                password: password
            }),
        })
        if (response.ok) {
            alert("Success!");
            setLoggedIn(true);
            navigate('/');
        } else {
            const errorMessage = await response.text();
            alert(errorMessage);
            setLoggedIn(false);
        }
        setUserName("");
        setPassword("");
    }

    return (
        <div className="mainLoginSignup">
            <h1>Signup</h1>
            <h5>or... <Link to="/login">login</Link></h5> 
            <form onSubmit={handleFormSubmit} className="formLogin">
                <p>User name</p>
                <input
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)} 
                    type="text"
                    placeholder="john"
                />
                <p>Password</p>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    type="password"
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
