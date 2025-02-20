// import mongoose from "mongoose"
import mongoose from "mongoose"
import dotenv from "dotenv";
dotenv.config();

const dbUrl = process.env.DATABASE_URI

const connectDb = async () => {

    try {
        if (!dbUrl) {
            throw new Error("MONGO_URI is not defined")
        }

        const conn = await mongoose.connect(dbUrl)
        console.log("✅ Database connected sucessfully !")

    } catch (error) {
        console.error("❌ Error in connecting database", error)
        process.exit(1)
    }
}

export default connectDb