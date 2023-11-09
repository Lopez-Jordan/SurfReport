import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { LogInContext } from "../App";
import './LoginSignup.css';


export default function Login () {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useContext(LogInContext);
    const [errorMessage, setErrorMessage] = useState("");
    
    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        let response = await fetch('/api/login', {
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
            setErrorMessage(errorMessage);
            setLoggedIn(false);
        }
        setUserName("");
        setPassword("");
    }

    useEffect(() => {
        window.scrollTo(0,1);
    }, []);

    return (
        <>
            <div className="twoCols">
                <div className="left">
                    <div className="loginForm">
                        <h1 className="loginHeader">Welcome back!</h1>
                        <form onSubmit={handleFormSubmit} className="form" action="">
                            <input className="input" value={userName} onChange={(e) => setUserName(e.target.value)} type="text" placeholder="Username" />
                            <input className="input" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                            <button className="loginButton" type="submit">Login</button>
                        </form>
                        {errorMessage && <div style={{color: "red", marginTop: "20px"}}>{errorMessage}</div>}
                        <div className="or">or... <Link to="/signup">signup</Link></div>
                    </div>
                </div>
                <div className="right">
                    <div className="split">
                        <img src="/main.png" alt="surfing picture" className="surfImage" />
                        <img src="/surf.jpg" alt="surfing picture" className="surfImage" />
                        <img src="/random.jpg" alt="surfing picture" className="surfImage" />
                    </div>
                    <div className="split">
                        <img src="/dolphin.jpg" alt="surfing picture" className="surfImage" />
                        <img src="/action.jpg" alt="surfing picture" className="surfImage" />
                        <img src="/surfPicThree.jpg" alt="surfing picture" className="surfImage" />
                        <img src="/random2.jpg" alt="surfing picture" className="surfImage" />
                    </div>
                </div>
            </div>
        </>
    )
}