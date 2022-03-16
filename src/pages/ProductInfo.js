import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useDispatch,useSelector } from "react-redux";
import fireDB from "../fireConfig";
import { getDoc, doc } from "firebase/firestore";
import { useParams } from "react-router-dom";

const ProductInfo = () => {
  const [product, setProduct] = useState();
  const [loading,setLoading]=useState(false)
  const params = useParams();
  const dispatch = useDispatch();

const { cartItems } = useSelector((state) => state.cartReducer);

  useEffect(() => {
    getdata();
  }, []);

  async function getdata() {
    try {
      setLoading(true)
      const productTemp = await getDoc(
        doc(fireDB, "products", params.productid)
      );

      // console.log(productTemp.data());
      setProduct(productTemp.data());
      setLoading(false)
      console.log(product);
    } catch (error) {
      console.log(error);
      setLoading(false)
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
       <div className="row justify-content-center">
         <div className="col-md-8">
         {product && (
        <div className="product-height">
          <p>
            <b>{product.name}</b>
          </p>
          <img src={product.imageURL} className="product-info-img" />
          <hr />
          <p>{product.description}</p>
          <div className="d-flex justify-content-end my-3">
            <button onClick={()=>addToCart(product)}>ADD TO CART</button>
          </div>
        </div>
      )}
         </div>
       </div>
     </div>
    </Layout>
  );
};

export default ProductInfo;
