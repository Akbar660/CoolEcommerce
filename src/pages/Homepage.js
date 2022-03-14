import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";

import fireDB from "../fireConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

// import { coolproducts } from "../ecommerce-products";

const Homepage = () => {
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    getdata()
  },[])

  async function getdata() {
    try {
      const users = await getDocs(collection(fireDB, "products"));
      const productsArray = [];
      users.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        const obj = {
          id: doc.id,
          ...doc.data(),
        };
        productsArray.push(obj);
      });
      setProducts(productsArray);
      console.log(productsArray);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout>

        <div className="container">

            <div className="row">
                 {products.map((product)=>{
                   return <div className="col-md-4"  key={product.id}>
                       <div className="m-2 p-1 product">
                           <p>{product.name}</p>
                           <img src={product.imageURL} alt="" className="product-img" />
                       </div>
                   </div>
                 })}
            </div>

        </div>

    </Layout>
  );
};

export default Homepage;
