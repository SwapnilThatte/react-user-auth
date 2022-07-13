import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./register.css";

export default function Login() {
    
    let navigate = useNavigate();
    const location = "/auth/login";

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
     const [registerMsg, setRegisterMsg] = useState("");

    const registerRequest = async (email, password, username) => {
        const payload = {
            email: email,
            password: password,
            username : username
        };
        try {
            const user = await axios.post(
                "http://localhost:5000/auth/register",
                payload
            );
            console.log(user);
            if (user.name !== "AxiosError") {
                return user;
            } 
            else {
                return "Login Error";
            }
        } 
        catch (err) {
            console.log("Inside catch block ", err.response.data.msg);
            return err.response.data.msg;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const user = await registerRequest(email, password, username);
        console.log("User Confirmation: ", typeof (user));
        if (typeof(user) !== "string") {
            console.log("Location: ", location);
            window.alert("Registration Sucessful Redirecting to Login Page")
            navigate(location, { replace: true });
        } else {
            console.log("REGISTERATION FAILED");
             setRegisterMsg(user);
        }
    };

    return (
        <div className="registerContainer">
            <div className="registrationFailed">{registerMsg}</div>
            <div className="registerWrapper">
                <div className="register">
                    <div>
                        <form className="registerForm">
                            <div className="registerTitle">Register</div>

                            <input
                                type="text"
                                className="registerInput"
                                placeholder="Username"
                                onChange={(event) => {
                                    setUsername(event.target.value);
                                }}
                            />

                            <input
                                type="email"
                                className="registerInput"
                                placeholder="Email"
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                }}
                            />
                            <input
                                type="password"
                                className="registerInput"
                                placeholder="Password"
                                onChange={(event) => {
                                    setPassword(event.target.value);
                                }}
                            />
                            <button
                                type="submit"
                                className="registerButton"
                                onClick={(event) => {
                                    handleSubmit(event);
                                }}
                            >
                                Sign Up
                            </button>
                        </form>
                    </div>
                    <Link to="/auth/login" className="signInOption">
                        Already have an account? Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
}
