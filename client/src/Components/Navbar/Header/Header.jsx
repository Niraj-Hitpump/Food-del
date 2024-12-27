import "./Header.css"

const Header = () => {
  return (
    <div className="header">
        <div className="header-content">
            <h2>Order Your Favourite Food Here..</h2>
            <p>Choose from a diverse menu featuringa variety of delicious dishes crafted with the freshest ingredients and finest prices available.</p>
            <button onClick={()=>window.location.href="#explore-menu"}>View Menu</button>
        </div>
    </div>
  )
}

export default Header