import { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Verify.css";
import { StoreContext } from "../../context/StoreContext";

const Verify = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const razorpayPaymentId = searchParams.get("razorpayPaymentId");
    const razorpaySignature = searchParams.get("razorpaySignature");
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();

    const verifypayment = async () => {
        try {
            const response = await axios.post(`${url}/api/order/verify`, {
                orderId,
                razorpayPaymentId,
                razorpaySignature,
            });

            if (response.data.success) {
                navigate("/myorders");
            } else {
                alert(response.data.message || "Verification failed. Redirecting...");
                navigate("/");
            }
        } catch (error) {
            console.error("Payment verification error:", error);
            alert("An error occurred during payment verification. Please try again.");
            navigate("/");
        }
    };

    useEffect(() => {
        if (success === "true") {
            verifypayment();
        } else if (success === "false") {
            alert("Payment failed. Redirecting to the homepage.");
            navigate("/");
        } else {
            alert("Payment unsuccessful. Redirecting to the homepage.");
            navigate("/");
        }
    }, [success, orderId, razorpayPaymentId, razorpaySignature]);

    return (
        <div className="verify">
            <div className="spinner">
                <p>Verifying Payment...</p>
            </div>
        </div>
    );
};

export default Verify;
