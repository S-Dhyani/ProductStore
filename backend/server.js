import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './db.js';
import productRouter from './routes/product.route.js';
import path from 'path'



dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors()); 
app.use(express.json()); // allows us to accept JSON data in the req.body
app.use("/api/products", productRouter);

const __dirname=path.resolve();

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"/frontend/dist")))

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"))
    })
}




// Start the server and connect to the database
app.listen(PORT, async () => {
    try {
        await connectDB(); // Ensure this returns a promise
        console.log(`Server started at http://localhost:${PORT}`);
    } catch (error) {
        console.error('Failed to connect to the database:', error);
        process.exit(1); // Exit the process if the database connection fails
    }
});