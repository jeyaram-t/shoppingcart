import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../store/slices/appSlice";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import OverlaySpinner from "../components/OverlaySpinner";
import { toast } from "react-toastify";
import { isAuthenticated } from "../utils/common";
import { apiURL } from "../utils/config";

const Login = () => {
  const navigate = useNavigate();
  const [loginName, setloginName] = useState("");
  const [loginPassword, setloginPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const loginClick = async () => {
    if (loginName.trim().length > 2 && loginPassword.trim().length > 4)
      try {
        setLoader(true);
        const payload = {
          username: "johnd",
          password: "m38rmF$"
        };
        const res = await axios.post(`${apiURL}auth/login`, payload);
        setTimeout(() => {
          dispatch(actions.setUserName(loginName));
          localStorage.setItem("accessToken", res.data.token);
          toast.success("Logged in successfully");
          navigate("/");
        }, 3000);
      }
      catch (error) {
        setLoader(false);
        toast.error("Failed to login. Please try again");
      }
  };

  const handleClik = () => {
    navigate("/signup");
  };

  return (
    <div className="main">
      {isAuthenticated() === true ? (
        <Navigate to="/" />
      ) : (
        <div>
          <header className="header"><h1>
            Shopping Cart
          </h1></header>
          <div className="main-menu">
            <div className="menu"></div>
            <div className="login">
              <div className="loginform">
                <h2 className="headerTitle">Login</h2>
                <div className="row">
                  <label>User name</label>
                  <input description="Username" placeholder="Enter user name" type="text" value={loginName}
                    onChange={(e) => setloginName(e.target.value)} />
                  <label>Password</label>
                  <input className="inputtwo" description="Password" placeholder="Enter your password" type="password"
                    value={loginPassword} onChange={(e) => setloginPassword(e.target.value)} />
                  <button onClick={loginClick}>Login</button>
                  <button onClick={handleClik}>Sign Up</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {loader && (<OverlaySpinner />)}
    </div>
  );
};

export default Login;
