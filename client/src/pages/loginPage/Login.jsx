import React, { useState } from 'react'
import axios from 'axios'
import { Link, Navigate } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import "./login.css"

export default function Login({location}) {

    if (location === undefined || location === null) {
        location = "/users/home"
    }

let navigate = useNavigate();
    let LOGIN_FAIL_MSG = ""

    const [token, setToken] = useState("") 
    const [loginMsg, setLoginMsg] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const saveToken = (userToken) => {
        localStorage.setItem("auth-token", JSON.stringify(userToken));
        setToken(userToken.token);
    };

    const loginRequest = async (email, password) => {

        const payload = {
            email : email,
            password : password
        }
        try {
            const user = await axios.post("http://localhost:5000/auth/login", payload)
            
            if (user.name !== "AxiosError") {
               
                saveToken(user.data.token);
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

    }

    const handleSubmit = async event => {
    
        event.preventDefault()
    
       const user = await loginRequest(email, password)
        
        console.log("User Confirmation: ", typeof(user))
        
        if (typeof(user) !== "string") {
            navigate(location, { replace: true });
            window.location.reload()
        } else {
            LOGIN_FAIL_MSG = "LOGIN FAILED";
        
            setLoginMsg(user);
        }
    }


  return (
      <div className="loginContainer">
          
              <div className="loginFailed">{loginMsg}</div>
          
          <div className="loginWrapper">
              <div className="login">
                  <div>
                      <form className="loginForm">
                          <div className="loginTitle">Login</div>
                          <input
                              type="email"
                              className="loginInput"
                              placeholder="Email"
                              onChange={(event) => {
                                  setEmail(event.target.value);
                              }}
                          />
                          <input
                              type="password"
                              className="loginInput"
                              placeholder="Password"
                              onChange={(event) => {
                                  setPassword(event.target.value);
                              }}
                          />
                          <button
                              type="submit"
                              className="loginButton"
                              onClick={(event) => {
                                  handleSubmit(event);
                              }}
                          >
                              Log In
                          </button>
                      </form>
                  </div>
                  <Link to="/auth/register" className="signUpOption">
                      Don't have an account? Sign Up
                  </Link>
              </div>
          </div>
      </div>
  );
}
