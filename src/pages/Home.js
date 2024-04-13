import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/common";

const Home = () => {
  const userName = useSelector(state => state.app.userName);

  return (
    <div>
      {isAuthenticated() === true ? (
        <div>
          <div>
            <div>{userName} </div>
            <h1>1</h1>
          </div>
        </div>
      ) : (<Navigate to="/login" />)}
    </div>
  );
};

export default Home;
