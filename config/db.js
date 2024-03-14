import mongoose from "mongoose";
async function connectDB(){
    try {
        mongoose.set('strictQuery', false)
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Database Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;