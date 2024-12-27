import { useState, useEffect } from "react";
import "./Order.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

const Order = () => {
  const url = "http://localhost:4000";
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error(response.data.message || "Error fetching orders");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch orders. Please try again.");
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        id: orderId,  // Pass the correct field (id) that the backend expects
        status: event.target.value,
      });
      if (response.data.success) {
        toast.success("Status updated successfully");
        fetchAllOrders(); // Refresh the orders after the status update
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status. Please try again.");
    }
  };
  

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order, index) => (
            <div className="order-item" key={index}>
              <img src={assets.parcel_icon} alt="Parcel Icon" />
              <p className="order-item-food">
                {order.items.map((item, idx) => (
                  <span key={idx}>
                    {item.name} x {item.quantity}
                    {idx !== order.items.length - 1 && ", "}
                  </span>
                ))}
              </p>
              <p className="order-item-name">
                {order.address.firstName} {order.address.lastName}
              </p>
              <div className="order-item-address">
              <p>{order.address.street+" ,"}</p>
              <p>{order.address.city+","+order.address.state+" ,"+order.address.country+" ,"+order.address.zipCode}</p>
              </div>
            <div>
              <p className="order-item-phone">
                {order.address.phone}
              </p>

            </div>
            <p>Items:{order.items.length}</p>
            <p>Amount:{order.amount}</p>
            <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Food Delivered"> Food Delivered</option>
            </select>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Order;
