import React, { useState } from "react";
import { Link } from 'react-router-dom';

export default function Signup() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleFormSubmit = (e) => {
        e.preventDefault();
        alert(`Hello ${userName} with password: ${password}`);
    }

    return (
        <div className="mainLoginSignup">
            <h1>Signup</h1>
            <h5>or... <Link to="/login">login</Link></h5> 
            <form onSubmit={handleFormSubmit} className="formLogin">
                <label>User name</label>
                <input
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)} 
                    type="text"
                    placeholder="john"
                />
                <label>Password</label>
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
