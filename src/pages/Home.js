import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { actions } from "../store/slices/appSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Content = () => {
  const dataRef = useRef({ data: [] });
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getProducts = useCallback(async () => {
    try {
      const response = await axios.get("https://api.escuelajs.co/api/v1/products");

      if (Array.isArray(response.data)) {
        const data = response.data.filter(item => {
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
        console.log(data)
        dataRef.current.data = data;
        setProduct(data.slice(0, 20));
      }
    }
    catch (error) {
      console.log(error.massage)
    }
  }, []);

  const addToCart = useCallback(product => {
    dispatch(actions.addCartItem(product));
    navigate("/cart");
  }, [navigate, dispatch]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <div className="row">
      {product.map((item) =>
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
      )}
    </div>
  );
};

export default Content;
