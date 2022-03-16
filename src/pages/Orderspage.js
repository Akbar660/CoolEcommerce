import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";

import fireDB from "../fireConfig";
import { collection, getDocs } from "firebase/firestore";

const Orderspage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(orders);
  useEffect(() => {
    getdata();
  }, []);

  async function getdata() {
    try {
      setLoading(true);
      const result = await getDocs(collection(fireDB, "orders"));
      const ordersArray = [];
      result.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        ordersArray.push(doc.data());
        setLoading(false);
      });
      setOrders(ordersArray);
    
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <Layout loading={loading} >
    <div className="p-2">
      {orders.map((order) => {
        return (<table className="table mt-3 order">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              
            </tr>
          </thead>
          <tbody>
            {order.cartItems.map((item) => {
              return (
                <tr key={item.id}>
                  <td>
                    <img src={item.imageURL} height="80" width="80" />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                </tr>
              );
            })}
          </tbody>
       
        </table>
      
        )
      })}
     </div>
    </Layout>
  );
};

export default Orderspage;
