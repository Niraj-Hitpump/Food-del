import { useContext, useState } from "react";
import { assets } from "../../assets/assets"
import "./FoodItems.css"
import { StoreContext } from "../../context/StoreContext";

const FoodItems = ({id,name,image,price,description}) => {
    
    const {cartItems,addToCart,removeFromCart,url} = useContext(StoreContext);
  return (
    <div className="food-item">
        <div className="food-item-img-container">
            {/* changes in the src help to load the data from the database */}
            <img className="food-item-img" src={url+"/images/"+image} alt="images" />
            {
                !cartItems[id]
                ?
                <img src={assets.add_icon_white} className="add" onClick={()=>addToCart(id)} />
                :
                <div className="food-item-counter">
                    <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                    <p>{cartItems[id]}</p>
                    <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
                </div>
            }
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="rating" />
            </div>
            <p className="food-item-desc">
                {description}
            </p>
            <p className="food-item-price">₹{price}</p>
        </div>
    </div>
  )
}

export default FoodItems