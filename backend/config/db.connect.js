import mongoose from "mongoose";
import { MONGO_URI } from "./constant.js";

export const connectDb = async () => {

    if (!MONGO_URI) throw new Error("MONGO_URI is not defined");

    try {
        await mongoose
            .connect(MONGO_URI)
            .then(() => console.log(`Db connected successfully`))
            .catch((error) => console.log(`Error occured from Db, ${error}`));
    } catch (error) {
        throw new Error(error.message);
    }
};