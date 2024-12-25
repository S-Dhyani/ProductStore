import mongoose from "mongoose"

export const connectDB= async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB connnected at ${conn.connection.host}`);
    }catch(e){
        console.log(`Error : ${e.message}`);
        process.exit(1)// 1 code mans exit with failure, 0 means success 
    }
}