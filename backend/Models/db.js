import mongoose from "mongoose";
// import connectDB from "../../../Food-Seva/backend/config/db";
// const mongo_url = process.env.MONGO_URL;

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB Connected`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};
