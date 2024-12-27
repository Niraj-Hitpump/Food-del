import { useContext, useEffect, useState } from "react"
import "./Myorders.css"
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";

const Myorders = () => {
    const[data,setData]=useState([]);
    const{url,token,}=useContext(StoreContext);

    const fetchOrder=async()=>{
        const response=await axios.post(`${url}/api/order/userorders`,{},{headers:{token:token}});
        setData(response.data.data);
    }

    useEffect(()=>{
        if(token){
            fetchOrder();
        }
    },[token]);
  return (
    <div className="my-orders">
        <h2>My Orders</h2>
        <div className="container">
        {
    data.map((order, index) => {
        return (
            <div className="my-orders-order" key={index}>
                <img src={assets.parcel_icon} alt="Parcel Icon" />
                <p>
                    {Array.isArray(order.items) &&
                        order.items.map((item, index) => {
                            if (index === order.items.length - 1) {
                                return `${item.name} x ${item.quantity}.`;
                            }
                            return `${item.name} x ${item.quantity}, `;
                        })}
                </p>
                <p>${order.amount}.00</p>
                <p>Items: {order.items.length}</p>
                <p><span>&#x25cf;</span><b>{order.status}</b></p>
                <button onClick={fetchOrder}>Track Order</button>
            </div>
        );
    })
}

        </div>
    </div>
  )
}

export default Myorders