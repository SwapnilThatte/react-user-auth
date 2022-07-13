import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Logout() {

    let navigate = useNavigate()
    const handleLogout = event => {
        localStorage.removeItem('auth-token')
        navigate('/auth/login', { replace: true });
        window.location.reload();
    }

  return (
    <div>

    <button className="logout-btn" onClick={event => {handleLogout();}}>Logout</button>

    </div>
  )
}
