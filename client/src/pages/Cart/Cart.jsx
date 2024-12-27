import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart,  getTotalCartAmount,url } = useContext(StoreContext);

  const navigate=useNavigate();
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Itmes</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((itmes, index) => {
          if (cartItems[itmes._id]) {
            return (
              <div key={index}> {/* Move key to the outermost div */}
                <div className="cart-items-title cart-items-item">
                  <img src={url+"/images/"+itmes.image} alt="" />
                  <p>{itmes.name}</p>
                  <p>{itmes.price}</p>
                  <p>{cartItems[itmes._id]}</p>
                  <p>{cartItems[itmes._id] * itmes.price}</p>
                  <p>
                    <button onClick={() => removeFromCart(itmes._id)}>Remove</button>
                  </p>
                </div>
                <hr />
              </div>
            );
          }
          return null; // Explicitly return null if the condition is false
        })}


      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount()===0?0:10}</p>
            </div>
            <hr />
            <div className="cart-total-details">
            <b>Total</b>
            <b>₹{getTotalCartAmount()===0?0:getTotalCartAmount()+10}</b>
            </div>
            <hr />
          </div>
          <button onClick={() => navigate("/order")}>Proceed To Checkout</button>
        </div>

        <div className="cart-promocode">
          <div>
            <p>If you have a promocode, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Promocode" />
              <button>Submit</button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Cart;
