import React, { useState } from "react";
import { useEffect } from "react";
import Layout from "../components/Layout";
import { useSelector, useDispatch } from "react-redux";

import { FaTrash } from "react-icons/fa";

const Cartpage = () => {
  const [total,setTotal]=useState(0)
console.log(total)
  const { cartItems } = useSelector((state) => state.cartReducer);
  // console.log(cartItems)

  const dispatch = useDispatch();

useEffect(()=>{
  let sum=0;
  cartItems.forEach(cartItem=>{
   sum=sum+(+cartItem.price)
  })
  setTotal(sum)

},[cartItems])


  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const deleteFromCart = (product) => {
    dispatch({ type: "DELETE_FROM_CART", payload: product });
  };

  return (
    <Layout>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => {
            return (
              <tr>
                <td>
                  <img src={item.imageURL} height="80" width="80" />
                </td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>
                  <FaTrash
                    cursor="pointer"
                    onClick={() => deleteFromCart(item)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="d-flex justify-content-end">
            <h1 className="total-amount">Totalamount={total} RS/-</h1>
      </div>
      <div className="d-flex justify-content-end mt-3">
           <button>PLACE ORDER</button>
      </div>
    </Layout>
  );
};

export default Cartpage;
