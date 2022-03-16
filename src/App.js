import "./App.css";

import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";

import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductInfo from "./pages/ProductInfo";
import Cartpage from "./pages/Cartpage";
import Orderspage from "./pages/Orderspage";


import "./stylesheets/layout.css";
import "./stylesheets/products.css";
import "./stylesheets/auth.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <ProtectedRoutes>
                <Homepage />
              </ProtectedRoutes>
            }
          />
         
          <Route
            path="/productinfo/:productid"
            exact
            element={
              <ProtectedRoutes>
                <ProductInfo />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/cart"
            exact
            element={
              <ProtectedRoutes>
                <Cartpage />
              </ProtectedRoutes>
            }
          />
           <Route
            path="/orders"
            exact
            element={
              <ProtectedRoutes>
                <Orderspage />
              </ProtectedRoutes>
            }
          />
        

           <Route path="/login" exact element={<LoginPage />} />
          <Route path="/register" exact element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

export const ProtectedRoutes = ({children}) => {
  if (localStorage.getItem("currentUser")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
