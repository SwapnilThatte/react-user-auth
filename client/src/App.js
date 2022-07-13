import './App.css';

import Login from './pages/loginPage/Login';
import Home from './pages/homePage/Home';
import Index from './pages/indexPage/Index';
import Register from './pages/registerPage/Register';

import { Routes, Route, Navigate } from 'react-router-dom'

import getToken from'./authToken'

function App() {


  const user = getToken()
  const URL = "http://localhost:5000";
  console.log("In App.js, token => ", user)

  return (
      <div className="App">
          
              <Routes>
                <Route exact path="/" element={<Index/>} />
                <Route path="/auth/register" element={user?<Navigate to="/users/home" replace={true}/>:<Register/>}/>
                <Route path="/auth/login" element={user?<Navigate to="/users/home" replace={true}/>:<Login/>}/>
                 <Route path="/users/home" element={!user?<Login location={"/users/home"}/>:<Home/>}/>
              </Routes>
          
      </div>
  );
}

export default App;
