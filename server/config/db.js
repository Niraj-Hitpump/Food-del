import mongoose from "mongoose";


export const connectDB = async () => {
   try {
    await mongoose.connect('mongodb+srv://Nirajkumar:asdfghjkl;@cluster0.e44ur.mongodb.net/food-del').then(()=>{
        console.log("Connected to DB");
    })
   } catch (error) {
    console.log(error);
   }
}
