import React, { Fragment } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header"
import Footer from "../components/Footer";
import { isAuthenticated } from "../utils/common";

const Home = () => {

  return (
    <div>
      {isAuthenticated() === true ? (
        <Fragment>
          <div className="main">
            <div className="">
              <Header />
              <main>
                <Outlet />
              </main>
            </div>
            <Footer />
          </div>
        </Fragment>
      ) : (<Navigate to="/login" />)}
    </div>
  );
};

export default Home;
