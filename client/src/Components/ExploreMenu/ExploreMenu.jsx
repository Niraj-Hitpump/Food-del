import "./ExploreMenu.css"
import { menu_list } from "../../assets/assets"

const ExploreMenu = ({category, setCategory}) => {
  return (
    <div className="explore-menu" id="explore-menu">
        <h1>Explore Our Menu</h1>
        <p className="explore-menu-text">Choose from a diverse menu featuring a variety of delicious dishes crafted with the freshest ingredients and finest prices available.Our mission is to provide you with a culinary experience that is both satisfying and enjoyable, whether you're in the mood for a hearty meal, a light snack, or a refreshing beverage.</p>
        <div className="explore-menu-list">
            {menu_list.map((item,index)=>(
                    <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className="explore-menu-list-item">
                        <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="menu" />
                        <p>{item.menu_name}</p>
                    </div>
                
            ))}
        </div>
        <hr />
    </div>
  )
}

export default ExploreMenu