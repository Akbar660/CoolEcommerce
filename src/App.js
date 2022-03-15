
import './App.css';

import {Route , BrowserRouter , Routes} from "react-router-dom"

import Homepage from './pages/Homepage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductInfo from './pages/ProductInfo';
import Cartpage from './pages/Cartpage';

import "./stylesheets/layout.css"
import "./stylesheets/products.css"

function App() {
  return (
    <div className="App">
   <BrowserRouter>
       <Routes>

           <Route path='/' exact element={<Homepage />} />
           <Route path='/login' exact element={<LoginPage />} />
           <Route path='/register' exact element={<RegisterPage />} />
           <Route path='/productinfo/:productid' exact element={<ProductInfo />} />
           <Route path='/cart' exact element={<Cartpage />} />

       </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
