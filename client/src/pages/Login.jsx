import { useState } from "react";
import { Link, useLocation } from 'react-router-dom';

export default function Login () {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleFormSubmit = (e) => {
        e.preventDefault();
        alert(`Hello ${userName} with password: ${password}`);
    }
    
    return (
        <>
            <div className="mainLoginSignup">
                <h1>Login</h1>
                <h5>or... <Link to="/signup">signup</Link></h5>
                <form onSubmit={handleFormSubmit} className="formLogin"  action="">
                    <label>User name</label>
                    <input value={userName} onChange={(e) => setUserName(e.target.value)}  type="text" placeholder="john" />
                    <label>Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}