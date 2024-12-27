import { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const LoginPopup = ({ setShowLogin }) => {

    const{url,setToken}=useContext(StoreContext);

    const [currState, setCurrState] = useState("Login");
    const[data,setData]=useState({
        name:"",
        email:"",
        password:""
    })

    const onchangeHandler=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setData({...data,[name]:value})
    }
    // it is mainly used to check the console where the data is being returned or not
    // useEffect(() => {
    //     console.log(data);
    // },[data])

    const onLogin=async(event)=>{
        event.preventDefault();
        let newUrl=url;
        if(currState==="Login"){
            newUrl+="/api/user/login";
        }
        else{
            newUrl+="/api/user/register";
        
        }
        const respone= await axios.post(newUrl,data);
        if(respone.data.success){
            setToken(respone.data.token);
            localStorage.setItem("token",respone.data.token);
            // after login it will hide the login page
            setShowLogin(false);
            toast.success(respone.data.message);
        }
        else{
            toast.error(respone.data.message);

        }
    }

    return (
        <div className="login-popup">
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img
                        onClick={() => setShowLogin(false)}
                        src={assets.cross_icon}
                        alt=""
                    />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? (
                        <></>
                    ) : (
                        <input type="text" placeholder="Name" name="name" value={data.name} onChange={onchangeHandler} required />
                    )}
                    <input type="email" placeholder="Email" name="email" value={data.email} onChange={onchangeHandler} required />
                    <input type="password" placeholder="Password" name="password" value={data.password} onChange={onchangeHandler} required />
                </div>
                <button type="submit">
                    {currState === "Sign Up" ? "Create Account" : "Login"}
                </button>
                <div className="login-popup-conditions">
                    <input type="checkbox" required />
                    <p>
                        By continuing, you agree to our terms and conditions.
                    </p>
                </div>
                {currState === "Login" ? (
                    <p>
                        Create a new account? <span onClick={() => setCurrState("Sign Up") }>Click Here</span>
                    </p>
                ) : (
                    <p>
                        Already have an account? <span onClick={() => setCurrState("Login") }>Login Here</span>
                    </p>
                )}
            </form>
        </div>
    );
};

export default LoginPopup;
