import mongoose from "mongoose";
// import { DB_NAME } from "../constants.js";
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect("mongodb+srv://shahbazkhalid818:vZfr60yefpxJfjxL@cluster0.gplcici.mongodb.net/food-app");
        console.log(`\n MongoDB Connected !! DB HOST : ${connectionInstance.connection.host}`);
    }
    catch (error) {
        console.log("MongoDB connection Failed: ", error);
        process.exit(1);
    }
};
export default connectDB;
