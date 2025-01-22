import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from './routes/userRoute.js'
import authRoutes from './routes/authRoute.js'
import adminRoutes from './routes/adminRoute.js'
import cors from 'cors'
import path from 'path'
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Connected to MongoDb"))
  .catch((error) => console.log(error));
const app = express();
app.use(express.json()) 
const __filename = fileURLToPath(import.meta.url); // Get current file path
const __dirname = path.dirname(__filename); // Get the directory of the current file
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: true })); // Form-urlencoded parsing
app.use(
  cors({
    origin: 'http://localhost:5173', // Vite default
    credentials: true, // For sending cookies
  })
);
app.use(cookieParser())
app.listen(3000, () => {
  console.log("Server is listening on Port:3000");
});


app.use("/api/user",userRoutes)
app.use("/api/auth",authRoutes)
app.use("/api/admin",adminRoutes)

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode
    })
})