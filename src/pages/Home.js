import React, { useCallback, useEffect, useRef } from "react";
import axios from "axios";
import { actions } from "../store/slices/appSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import OverlaySpinner from "../components/OverlaySpinner";

const Content = () => {
  const dataRef = useRef({ data: [] });
  const navigate = useNavigate();
  const products = useSelector(state => state.app.products);
  const filter = useSelector(state => state.app.filter);
  const dispatch = useDispatch();

  const getProducts = useCallback(async () => {
    dispatch(actions.setProductLoader());
    try {
      const response = await axios.get("https://api.escuelajs.co/api/v1/products");

      let data = [];
      if (Array.isArray(response.data)) {
        data = response.data.filter(item => {
          let imgURL = "";
          if (Array.isArray(item.images) && item.images.length > 0) {
            if (item.images.length === 1) {
              try {
                const imgList = JSON.parse(item.images[0]);
                item.images = imgList;
                imgURL = imgList[0];
              } catch {
                imgURL = item.images[0];
              }
            } else {
              try {
                const imgList = JSON.parse(item.images.join(","));
                item.images = imgList;
                imgURL = imgList[0];
              } catch {
                imgURL = item.images[0];
              }
            }
          }
          if (imgURL !== "") {
            item.imgURL = imgURL;
            return true;
          }
          return false;
        });
        dataRef.current.data = data;
      }
      dispatch(actions.setProductData(data));
    }
    catch (error) {
      dispatch(actions.setProductError(error));
    }
  }, [dispatch]);

  const addToCart = useCallback(product => {
    dispatch(actions.addCartItem(product));
    navigate("/cart");
  }, [navigate, dispatch]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <div className="row">
      {
        products.loader === true ? (
          <OverlaySpinner />
        ) : filter.data.map((item) =>
          <div key={item.id} className="col-md-3 mt-2">
            <div className="card">
              <div className="card-body">
                <div className="card-img-actions">
                  <img src={item.imgURL} alt={item.title} className="card-img img-fluid" />
                </div>
              </div>
              <div className="card-body bg-light text-center">
                <div className="mb-2">
                  <h6 className="font-weight-semibold mb-2">
                    {item.title}
                  </h6>
                </div>
                <h3 className="mb-0 font-weight-semibold">{item.price}</h3>
                <div className="text-muted mb-3">34 reviews</div>
                <button type="button" className="btn bg-cart" onClick={() => addToCart(item)}>
                  <i className="fa fa-cart-plus mr-2"></i>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default Content;
