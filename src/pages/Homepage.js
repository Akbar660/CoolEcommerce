import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";

import fireDB from "../fireConfig";
import { collection, getDocs } from "firebase/firestore";

// import { coolproducts } from "../ecommerce-products";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { cartItems } = useSelector((state) => state.cartReducer);

  const [searchkey, setSearchkey] = useState("");
  const [filtertype, setFiltertype] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getdata();
  }, []);

  async function getdata() {
    try {
      setLoading(true);
      const users = await getDocs(collection(fireDB, "products"));
      const productsArray = [];
      users.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        const obj = {
          id: doc.id,
          ...doc.data(),
        };
        productsArray.push(obj);
        setLoading(false);
      });
      setProducts(productsArray);
      console.log(productsArray);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <Layout loading={loading}>
      <div className="container">
        <div className="d-flex w-50">
          <input 
            type="text"
            className="form-control m-2"
            placeholder="search items"
            value={searchkey}
            onChange={(e) => setSearchkey(e.target.value)}
          />
          <select
            className="form-control m-2"
            value={filtertype}
            onChange={(e) => setFiltertype(e.target.value)}
          >
            <option value="">All</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="furniture">Furniture</option>
          </select>
        </div>
        <div className="row">
          {products
            .filter((obj) => obj.name.toLowerCase().includes(searchkey))
            .filter((obj) => obj.category.toLowerCase().includes(filtertype))
            .map((product) => {
              return (
                <div className="col-md-4" key={product.id}>
                  <div className="m-2 p-1 product position-relative">
                    <div className="product-content">
                      <p>{product.name}</p>
                      <div className="text-center">
                        <img
                          src={product.imageURL}
                          alt=""
                          className="product-img"
                        />
                      </div>
                    </div>

                    <div className="product-actions">
                      <h2>{product.price} RS/-</h2>
                      <div className="d-flex">
                        <button
                          onClick={() => addToCart(product)}
                          className="mx-2"
                        >
                          ADD TO CART
                        </button>
                        <button
                          onClick={() => {
                            navigate(`/productinfo/${product.id}`);
                          }}
                        >
                          VIEW
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
