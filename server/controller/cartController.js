import userModel from "../models/userModel.js";

// add items to user cart
const addToCart = async (req, res) => {
    try {
        let userData=await userModel.findById({_id:req.body.userId});
        let cartData=await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId]=1;
        }
        else{
            cartData[req.body.itemId]+=1;
        }
        await userModel.findByIdAndUpdate(
            {_id:req.body.userId},
            {cartData:cartData}
        );
        res.json({success:true,message:"Item added to Cart"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Something went wrong"});
    }
}

// remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        let userData=await userModel.findById({_id:req.body.userId});
        let cartData=await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId]-=1;
        }
        await userModel.findByIdAndUpdate(
            req.body.userId,
            {cartData:cartData}
        )
        res.json({success:true,message:"Item removed from Cart"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Something went wrong"});
    }
}

// fetch user cart data

const getCart=async(req,res)=>{
try {
    let userData=await userModel.findById({_id:req.body.userId});
    let cartData=await userData.cartData;
    res.json({success:true,cartData});
} catch (error) {
    console.log(error);
    res.json({success:false,message:"Something went wrong"});
}
};
export {addToCart,removeFromCart,getCart};