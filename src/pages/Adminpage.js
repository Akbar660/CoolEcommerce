import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";

import fireDB from "../fireConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

const Adminpage = () => {
  return (
    <Layout>admin screen</Layout>
  )
}

export default Adminpage
