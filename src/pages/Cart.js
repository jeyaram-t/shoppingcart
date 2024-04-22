import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../store/slices/appSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons/faCirclePlus";
import { faCircleMinus } from "@fortawesome/free-solid-svg-icons/faCircleMinus";
import { Button } from "react-bootstrap";

const Cart = () => {
  const cartItems = useSelector(state => state.app.cartItems);
  const dispatch = useDispatch();

  const addToCart = useCallback(product => {
    dispatch(actions.addCartItem(product));
  }, [dispatch]);

  const removFromCart = useCallback(product => {
    dispatch(actions.removeCartItem(product))
  }, [dispatch]);

  console.log(cartItems);
  return (
    <div>
      {cartItems.map((item) =>
        <div key={item.id}>
          <div className="container mt-5 mb-5 " >
            <div className="col-md-11">
              <div className="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded ">
                <div className=" w-40%">
                  <div className="cart-row mr-1 d-flex flex-column">
                    <img className="rounded" src={item.product.imgURL} alt="" width="200" />
                  </div>
                  <div className="d-flex flex-column align-items-center product-details">
                    <span className="font-weight-bold">{item.product.title}</span></div>
                </div>

                <div className="d-flex align-items-center qty ">
                  <div className="in-di " role="button"  >
                    <FontAwesomeIcon icon={faCirclePlus} size="2x" color="green" onClick={() => addToCart(item.product)} />
                  </div>
                  <h5 className="text-grey mt-1 pr-10 pl-1 lg text-decoration-underline">{item.count}</h5>
                  <div className="in-di" role="button">
                    <FontAwesomeIcon icon={faCircleMinus} size="2x" color="red" onClick={() => removFromCart(item.product)} />
                  </div>
                </div>

                <div>
                  <h5 className="text-grey d-flex">Rs.{item.count * item.product.price}</h5>
                </div>
                <Button className="btn-danger ml-2" onClick={() => removFromCart(item.id)}>
                  Remove
                </Button>
              </div>
            </div>

          </div>
        </div>
      )};
    </div>
  );
};

export default Cart;
