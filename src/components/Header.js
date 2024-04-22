import React from "react";
import { useSelector } from "react-redux";
import { actions } from "../store/slices/appSlice";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const userName = useSelector(((state) => state.app.userName));

  const logout = () => {
    actions.setUserName("");
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <header>
      <nav className="navbar navbar-dark bg-primary px-3">
        <Link className="navbar-brand">Shopping Cart</Link>
        <form className="form col-xs-5">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-success m-2 my-sm-0" type="submit">
            Search
          </button>
        </form>

        <div className="nav">
          <div
            className="nav-cart-icon nav-sprite"
            type="button"
            onClick={() => navigate("/cart")}
          >
            <img src="cart.png" alt="Cart" />
          </div>
          <div role="button" onClick={() => navigate("/")}>Home</div>
          <div>{userName}</div>
          <button className="btn btn-success" onClick={logout}>Logout</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
