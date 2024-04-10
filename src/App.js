import React from 'react';
import './App.css';
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const handleClik = () => {
    navigate("signup");
  };


  return (


    <div className='main'>
      <div>
        <header className='header'><h1>
          Shopping Cart
        </h1></header>
        <div className='main-menu'>
          <div className='menu'></div>
          <div className='login'>
            <div className='loginform'>
              <h2 className='headerTitle'>Login</h2>
              <div class="row">
                <label>User name</label>
                <input description="Username" placeholder="Enter user name" type="text" />
                <label>Password</label>
                <input className='inputtwo' description="Password" placeholder="Enter your password" type="password" />
                <button>Login</button>
                <button onClick={handleClik}>Sign Up</button>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>

  );
}

export default App;
