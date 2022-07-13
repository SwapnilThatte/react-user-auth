import React, { useEffect, useState } from 'react'
import axios from 'axios'
import getToken from "../../authToken";
import Logout from '../../components/logout/Logout';

export default function Home() {

    const userToken = getToken();

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")

    const getData = async () => {
        try {
            const user = await axios.post("http://localhost:5000/users/home", {
                userId: userToken,
            });
            if (user) {
                // console.log(user)
                return user.data.user
            }
            else {
                return "error"
            }
        }
        catch (err) {
            return err
        }
    }

    let user; 
   useEffect(() => {
    const fetchData = async() => {
        user =  await getData()
    
        const username = user.username;
        const email = user.email
        setUsername(username)
        setEmail(email)
    }
    fetchData()
   })

  return (
    <div>
        <h1>Home</h1>
        <Logout/>
        <h3>{username}</h3>
        <h3>{email}</h3>
    </div>
  )
}
