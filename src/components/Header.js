import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../store/slices/appSlice";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const Header = () => {
  const navigate = useNavigate();
  const userName = useSelector(((state) => state.app.userName));
  const products = useSelector(state => state.app.products);
  const filter = useSelector(state => state.app.filter);
  const [searchValue, setSearchValue] = useState(filter.searchText);
  const dispatch = useDispatch();
  const location = useLocation();

  const logout = () => {
    actions.setUserName("");
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  const onSearch = () => {
    dispatch(actions.filterBySearch(searchValue));
    if (matchPath(location.pathname, "/cart")) navigate("/");
  };

  const validData = products.loader === false && products.error === null && products.data.length !== 0;
  return (
    <header>
      <nav className="navbar navbar-dark bg-primary px-3">
        <Link className="navbar-brand">
          <span className="fw-bold">Shopping Cart</span>
        </Link>
        <form className="form col-xs-5">
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            disabled={validData === false}
          />
          <Button
            className="btn-success m-2 my-sm-0"
            disabled={validData === false}
            onClick={onSearch}
          >
            Search
          </Button>
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
