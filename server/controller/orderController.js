// import orderModel from "../models/orderModel.js";
// import userModel from "../models/userModel.js";
// import Razorpay from "razorpay";
// import dotenv from "dotenv";
// dotenv.config();

// const razorpay = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // placing user ordr from frontend
// const placeOrder = async (req, res) => {
//     const frontend_url="http://localhost:5173";
//     try {
//         const newOrder=new orderModel({
//             userId:req.body.userId,
//             items:req.body.items,
//             amount:req.body.amount,
//             address:req.body.address,
//         })
//         await newOrder.save();
//         // to clear the cart data
//         await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

//         const line_items=req.body.items.map((item)=>(
//             {
//                 price_data:{
//                     currency:"INR",
//                     product_data:{name:item.name},
//                     unit_amount:item.price*100*80
//                     // conveting dollar into inr
//                 },
//                 quantity:item.quantity
//             }
//         ))
//         line_items.push({
//             price_data:{
//                 currency:"INR",
//                 product_data:{name:"Delivery Charges"},
//                 unit_amount:50*100*80
//                 // conveting dollar into inr
//             },
//             quantity:1
//         })
//         const session=await razorpay.checkout.sessions.create({
//             line_items:line_items,
//             mode:"payment",
//             success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
//             cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
//         })

//         res.json({success:true,session_url:session.url})
//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:"Something went wrong"})
//     }
// }

// export default placeOrder ;

import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Placing user order from frontend
const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173";

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });
        await newOrder.save();

        // Clear the cart data
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // Create a Razorpay order
        const options = {
            amount: newOrder.amount * 100, // Convert to paise
            currency: "INR",
            receipt: `${newOrder._id}`,
        };
        

        const razorpayOrder = await razorpay.orders.create(options);

        res.json({
            success: true,
            orderId: newOrder._id,
            razorpayOrderId: razorpayOrder.id,
            amount: req.body.amount,
            currency: "INR",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

export default placeOrder;


// import crypto from "crypto";
// // Verify Razorpay payment
// const verifyOrder = async (req, res) => {
//     const { orderId, razorpayPaymentId, razorpaySignature } = req.body;
//     const order = await orderModel.findById(orderId);

//     if (!order) {
//         return res.status(404).json({ success: false, message: "Order not found" });
//     }

//     const generatedSignature = crypto
//         .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//         .update(orderId + "|" + razorpayPaymentId)
//         .digest('hex');

//     if (generatedSignature === razorpaySignature) {
//         order.payment = true;
//         order.status = "Paid";
//         await order.save();
//         return res.status(200).json({ success: true, message: "Payment verified successfully" });
//     }

//     return res.status(400).json({ success: false, message: "Invalid signature" });
// };

// export { placeOrder };


// user orders for frontend
const userOrders = async (req, res) => {
    try {
        const orders=await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}
export { userOrders };


// listing order logic for the admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};
export { listOrders };

// for the delivery staus or order status:-
const updateStatus = async (req, res) => {
    const { id, status } = req.body; // Ensure these are received properly
    try {
      await orderModel.findByIdAndUpdate(id, { status: status });
      res.json({ success: true, message: "Status updated successfully" });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error updating status" });
    }
  }
  
export { updateStatus };