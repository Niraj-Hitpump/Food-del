import axios from "axios";
import { createContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000";
    // for token storing
    const [token, setToken] = useState("");
    // for fetching food from  list from the database
    const [food_list, setFoodList] = useState([]);

    const addToCart = async(itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if(token){
            await axios.post(`${url}/api/cart/add`,{itemId},{headers:{token:token}});
        }
    };

    const removeFromCart = async(itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if(token){
            await axios.post(`${url}/api/cart/remove`,{itemId},{headers:{token:token}});
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                // Ensure proper type matching between cartItems and food_list._id
                let itemInfo = food_list.find((i) => i._id === item); // Remove Number() if _id is a string
                if (itemInfo) {
                    // Add a null-check for itemInfo
                    totalAmount += cartItems[item] * itemInfo.price;
                }
            }
        }
        return totalAmount;
    };
    //   logic for the food list fetching
    const fetchFoodList = async () => {
        const response = await axios.get(`${url}/api/food/list`);
        if (response.data.success) {
            setFoodList(response.data.data);
        } else {
            console.error("Something went wrong");
        }
    };

    // logic for the cart select after the refresh
    const loadCart=async(token)=>{
        const response=await axios.post(`${url}/api/cart/get`,{},{headers:{token:token}});
        setCartItems(response.data.cartData);
    }

    //   logic when we refresh also then token willbe saved
    // this is the whole logic which control all refreshing to store token
    useEffect(() => {
        // to load the food list
        async function loadData() {
            // this one line is for the load the list of card of data
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                // for the cart dataload
                await loadCart(localStorage.getItem("token"));
            }
        }
        loadData();
    }, []);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
    };
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
