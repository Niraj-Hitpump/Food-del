import Navbar from "./Components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart/Cart";
import Placeholder from "./pages/PlaceOrder/Placeorder";
import Footer from "./Components/Footer/Footer";
import { useState } from "react";
import LoginPopup from "./Components/LoginPopup/LoginPopup";
// import Verify from "./pages/verify/Verify";
import Myorders from "./pages/myOrders/Myorders";
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const App = () => {
    const [showLogin, setShowLogin] = useState(false);
    return (
        <>
        {showLogin ? <LoginPopup  setShowLogin={setShowLogin}/>:<></>}
            <div className="app">
                <ToastContainer/>
                <Navbar setShowLogin={setShowLogin}/>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/order" element={<Placeholder />} />
                    {/* <Route path="/verify" element={<Verify />} /> */}
                    <Route path="/myorders" element={<Myorders/>}/>

                </Routes>
            </div>
            <Footer />
        </>
    );
};

export default App;
