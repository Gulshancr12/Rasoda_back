import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://gulshancr12:Gulshanaug12@cluster0.mshwtws.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}