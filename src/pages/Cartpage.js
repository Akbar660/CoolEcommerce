import React, { useState } from "react";
import { useEffect } from "react";
import Layout from "../components/Layout";
import { useSelector, useDispatch } from "react-redux";

import { FaTrash } from "react-icons/fa";

import { Modal } from "react-bootstrap";
import { addDoc, collection } from "firebase/firestore";
import fireDB from "../fireConfig";
import { toast } from "react-toastify";

const Cartpage = () => {
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  console.log(total);
  const { cartItems } = useSelector((state) => state.cartReducer);
  // console.log(cartItems)
  const dispatch = useDispatch();
  
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setphoeNumber] = useState("");
  const [pincode, setPincode] = useState("");
  
 

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    let sum = 0;
    cartItems.forEach((cartItem) => {
      sum = sum + +cartItem.price;
    });
    setTotal(sum);
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const deleteFromCart = (product) => {
    dispatch({ type: "DELETE_FROM_CART", payload: product });
  };

  //  order placeing
const placeOrder = async () => {
    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber,
    };
    console.log(addressInfo);

    const orderInfo = {
      cartItems,
      addressInfo,
      email: JSON.parse(localStorage.getItem("currentUser")).user.email,
      userid: JSON.parse(localStorage.getItem("currentUser")).user.uid,
    };

    try {
      setLoading(true)
      const result = await addDoc(collection(fireDB, "orders"), orderInfo);
      setLoading(false);
      toast.success("Order Placed Sucessfully");
    } catch (error) {
      setLoading(false);
      toast.error("Order Failed");
      console.log(error);
      
    }
  };

  return (
    <Layout loading={loading}>
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
              <tr key={item.id}>
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
        <button onClick={handleShow}>PLACE ORDER</button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add your addess</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <div className="register-form">
            <input
              type="text"
              className="form-control"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <hr />
            <textarea
              rows={3}
              type="text"
              className="form-control"
              placeholder="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <hr />
            <input
              type="text"
              className="form-control"
              placeholder="pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
            <hr />
            <input
              type="number"
              className="form-control"
              placeholder="phone number"
              value={phoneNumber}
              onChange={(e) => setphoeNumber(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button variant="secondary" onClick={handleClose}>
            Close
          </button>
          <button variant="primary" onClick={placeOrder}>
            ORDER
          </button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};

export default Cartpage;
