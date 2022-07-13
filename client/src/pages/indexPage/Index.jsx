import React from 'react'
import { Link } from 'react-router-dom'

export default function Index() {
  return (
      <div>
          Welcome to My React App
          <br />
          <br />
          <br />
          <Link to="/auth/login">Login</Link>
          <br />
          <br />
          <Link to="/auth/register">Register</Link>
      </div>
  );
}
