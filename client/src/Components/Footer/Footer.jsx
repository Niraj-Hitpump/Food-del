import { assets } from "../../assets/assets"
import "./Footer.css"

const Footer = () => {
  return (
    <div className="footer" id="footer">
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="logo" />
                <p>Eat healthier with us with a minimunal effort and price point .So stop worrying about your health and start eating healthy and delicious food, with us.so, eat healthy and live healthy</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="facebook" />
                    <img src={assets.twitter_icon} alt="twitter" />
                    <img src={assets.linkedin_icon} alt="linkedin" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>HITPUMP_WORLD</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+91 1234567890</li>
                    <li>heroniraj@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">
            Copyright 2025 @ HITPUMP_WORLD.COM - All Rights Reserved
        </p>
    </div>
  )
}

export default Footer