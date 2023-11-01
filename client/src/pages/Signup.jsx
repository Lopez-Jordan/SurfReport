import React, { useState, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { LogInContext } from "../App";
import './LoginSignup.css';


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
        <>
            <div className="twoCols">
                <div className="left">
                    <div className="loginForm">
                        <h1>Create Account</h1>
                        <form onSubmit={handleFormSubmit} className="form" action="">
                            <input
                                className="input"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                type="text"
                                placeholder="Username"
                            />
                            <input
                                className="input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="Password"
                            />
                            <button className="loginButton" type="submit">
                                Sign up
                            </button>
                        </form>
                        <div className="or"> or... <Link to="/login">login</Link> </div>
                    </div>
                </div>
                <div className="right">placeholder</div>
            </div>
        </>

    );
}
