import "./Add.css";
import { assets } from "../../assets/assets";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({url}) => {
    const [image, setImage] = useState(null); // Updated default state
    const [data, setData] = useState({
        name: "",
        description: "",
        category: "Salad", // Corrected casing to match options
        price: "",
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        if (!image) {
            toast.error("Please upload an image."); // Simple client-side validation
            return;
        }
        
        const formData = new FormData();
        formData.append("image", image);
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("category", data.category);
        formData.append("price", Number(data.price));

        try {
            const response = await axios.post(`${url}/api/food/add`, formData);
            if (response.data.success) {
               toast.success("Product added successfully!");
                setData({
                    name: "",
                    description: "",
                    category: "Salad",
                    price: "",
                });
                setImage(null);
                toast.success("Product added successfully!");
            } else {
                toast.error("Failed to add product. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting product:", error);
            toast.error("An error occurred while adding the product.");
        }
    };

    return (
        <div className="add">
            <form className="flex-col" onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img
                            src={image ? URL.createObjectURL(image) : assets.upload_area}
                            alt="upload preview"
                        />
                    </label>
                    {/* Updated to use onChange for file input */}
                    <input
                        onChange={(e) => setImage(e.target.files[0])}
                        type="file"
                        id="image"
                        hidden
                        required
                    />
                </div>

                <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    <input
                        onChange={onChangeHandler}
                        value={data.name}
                        type="text"
                        name="name"
                        placeholder="Product Name"
                        required
                    />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product Description</p>
                    <textarea
                        onChange={onChangeHandler}
                        value={data.description}
                        name="description"
                        rows="6"
                        placeholder="Product Description"
                        required
                    ></textarea>
                </div>
                <div className="add-category-type">
                    <div className="add-category flex-col">
                        <p>Product Category</p>
                        <select
                            onChange={onChangeHandler}
                            value={data.category}
                            name="category"
                        >
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input
                            onChange={onChangeHandler}
                            value={data.price}
                            type="number"
                            name="price"
                            placeholder="Product Price"
                            required
                        />
                    </div>
                </div>
                <button className="add-btn" type="submit">
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default Add;
