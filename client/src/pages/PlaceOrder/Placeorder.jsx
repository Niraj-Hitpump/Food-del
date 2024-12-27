// import { useContext, useState } from "react";
// import "./Placeorder.css";
// import { StoreContext } from "../../context/StoreContext";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Placeorder = () => {
//     const { getTotalCartAmount,token,food_list,cartItems,url } = useContext(StoreContext);
//     const [data,setData]=useState({
//         firstName:"",
//         lastName:"",
//         email:"",
//         street:"",
//         city:"",
//         state:"",
//         zipCode:"",
//         country:"",
//         phone:""
//     });

//     const onchangeHandler=(event)=>{
//         const name=event.target.name;
//         const value=event.target.value;
//         setData({...data,[name]:value})
//     }
//     const navigate=useNavigate();
 
//     const placeOrder=async(event)=>{
//         event.preventDefault();
//         let orderItems=[];
//         food_list.map((item)=>{
//             if(cartItems[item._id]>0){
//                 let itemInfo=item;
//                 itemInfo["quantity"]=cartItems[item._id];
//                 orderItems.push(itemInfo);
//             }
//         })
//         let orderData={
//             address:data,
//             items:orderItems,
//             amount:getTotalCartAmount()+2,
//         }
//         let response=await axios.post(`${url}/api/order/place`,orderData,{headers:{token:token}});
//         if(response.data.success){
//             const {session_url}=response.data;
//             window.location.replace(session_url);
//         }
//         else{
//             alert(response.data.message);
//         }
//     }

//     return (
//         <form className="place-order" onSubmit={placeOrder}>
//             <div className="place-order-left">
//                 <p className="title">Delivery Information</p>
//                 <div className="multi-fields">
//                     <input name= "firstName" onChange={onchangeHandler} value={data.firstName} type="text" placeholder=" First Name"  required/>
//                     <input type="text"  placeholder="Last Name" name="lastName"  onChange={onchangeHandler} value={data.lastName} required/>
//                 </div>
//                 <input type="email" placeholder="Email Address"  name="email" onChange={onchangeHandler} value={data.email} required/>
//                 <input type="text" placeholder="Email Street"  name="street" onChange={onchangeHandler} value={data.street} required/>
//                 <div className="multi-fields">
//                     <input type="text" placeholder=" City" name="city" onChange={onchangeHandler} value={data.city}  required/>
//                     <input type="text" placeholder="Street" name="state" onChange={onchangeHandler} value={data.state}  required/>
//                 </div>
//                 <div className="multi-fields">
//                     <input type="text" placeholder=" Zip code" name="zipCode" onChange={onchangeHandler} value={data.zipCode}  required/>
//                     <input type="text" placeholder="Country" name="country" onChange={onchangeHandler} value={data.country}  required/>
//                 </div>
//                 <input type="Number" placeholder="Mobile Number"  name="phone" onChange={onchangeHandler} value={data.phone} required/>
//             </div>
//             <div className="place-order-right">
//                 <div className="cart-total">
//                     <h2>Cart Totals</h2>
//                     <div>
//                         <div className="cart-total-details">
//                             <p>Subtotal</p>
//                             <p>₹{getTotalCartAmount()}</p>
//                         </div>
//                         <hr />
//                         <div className="cart-total-details">
//                             <p>Delivery Fee</p>
//                             <p>₹{getTotalCartAmount() === 0 ? 0 : 10}</p>
//                         </div>
//                         <hr />
//                         <div className="cart-total-details">
//                             <b>Total</b>
//                             <b>
//                                 ₹
//                                 {getTotalCartAmount() === 0
//                                     ? 0
//                                     : getTotalCartAmount() + 10}
//                             </b>
//                         </div>
//                         <hr />
//                     </div>
//                     <button type="submit" onClick={() => navigate("/order")}>
//                         Proceed To Checkout
//                     </button>
//                 </div>
//             </div>
//         </form>
//     );
// };

// export default Placeorder;


import { useContext, useEffect, useState } from "react";
import "./Placeorder.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Placeorder = () => {
    const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        phone: "",
    });

    const onchangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData({ ...data, [name]: value });
    };

    const navigate = useNavigate();

    const placeOrder = async (event) => {
        event.preventDefault();
        const orderItems = food_list
            .filter((item) => cartItems[item._id] > 0)
            .map((item) => ({
                ...item,
                quantity: cartItems[item._id],
            }));

        const orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 10, // Adding delivery fee
        };

        try {
            const response = await axios.post(`${url}/api/order/place`, orderData, {
                headers: { token: token },
            });

            if (response.data.success) {
                const { razorpayOrderId, amount, currency } = response.data;

                const options = {
                    key: "rzp_test_EQBAM3VQrwFht9", // Replace with your Razorpay Key ID
                    amount: amount * 100, // Amount in paise
                    currency: currency,
                    name: "Food WebApp",
                    description: "Thank you for your order!",
                    order_id: razorpayOrderId,
                    handler: function (response) {
                        alert(`Payment successful: ${response.razorpay_payment_id}`);
                        // navigate(`/verify?success=true&orderId=${this.order_id}&razorpay_payment_id=${response.razorpay_payment_id}&razorpay_signature=${response.razorpay_signature}`);
                        navigate("/myorders");
                    },
                    
                    prefill: {
                        name: `${data.firstName} ${data.lastName}`,
                        email: data.email,
                        contact: data.phone,
                    },
                    theme: {
                        color: "#F37254",
                    },
                };

                const rzp = new window.Razorpay(options);
                rzp.open();
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error(error);
            alert("Payment failed. Please try again.");
        }
    };


    useEffect(() => {
        if(!token){
            navigate("/cart");
        }
        else if(getTotalCartAmount() === 0){
            navigate("/cart");
        }
    }, [token]);

    return (
        <form className="place-order" onSubmit={placeOrder}>
            <div className="place-order-left">
                <p className="title">Delivery Information</p>
                <div className="multi-fields">
                    <input
                        name="firstName"
                        onChange={onchangeHandler}
                        value={data.firstName}
                        type="text"
                        placeholder="First Name"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        onChange={onchangeHandler}
                        value={data.lastName}
                        required
                    />
                </div>
                <input
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    onChange={onchangeHandler}
                    value={data.email}
                    required
                />
                <input
                    type="text"
                    placeholder="Street"
                    name="street"
                    onChange={onchangeHandler}
                    value={data.street}
                    required
                />
                <div className="multi-fields">
                    <input
                        type="text"
                        placeholder="City"
                        name="city"
                        onChange={onchangeHandler}
                        value={data.city}
                        required
                    />
                    <input
                        type="text"
                        placeholder="State"
                        name="state"
                        onChange={onchangeHandler}
                        value={data.state}
                        required
                    />
                </div>
                <div className="multi-fields">
                    <input
                        type="text"
                        placeholder="Zip Code"
                        name="zipCode"
                        onChange={onchangeHandler}
                        value={data.zipCode}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Country"
                        name="country"
                        onChange={onchangeHandler}
                        value={data.country}
                        required
                    />
                </div>
                <input
                    type="number"
                    placeholder="Mobile Number"
                    name="phone"
                    onChange={onchangeHandler}
                    value={data.phone}
                    required
                />
            </div>
            <div className="place-order-right">
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
                            <p>₹{getTotalCartAmount() === 0 ? 0 : 10}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>
                                ₹
                                {getTotalCartAmount() === 0
                                    ? 0
                                    : getTotalCartAmount() + 10}
                            </b>
                        </div>
                        <hr />
                    </div>
                    <button type="submit">Proceed To Checkout</button>
                </div>
            </div>
        </form>
    );
};

export default Placeorder;
