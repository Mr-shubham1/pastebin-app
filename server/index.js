import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import pasteRouter from "./routes/pasteRoute.js"
import cors from "cors"

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
app.use(express.json());
const allowedOrigins = [
  "http://localhost:5173",
  "https://pastebin-app-alpha.vercel.app"
];
app.use(cors({
  origin:allowedOrigins,
  credentials:true
}))




app.use("/api/v1/paste",pasteRouter);



const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
  }
};

startServer(); 

