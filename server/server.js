import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./Routes/authRoutes.js";
import userRouter from "./Routes/userRoute.js";

const app = express();
const port = process.env.PORT || 4000;
connectDB();


app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://mern-auth-6ub3.onrender.com"],
    credentials: true,
  })
);

app.use(cookieParser());

//APL endpoints
app.get("/", (req, res) => {
  res.send("Hello World! API is running");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app
  .listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`http://localhost:${port}`);
  })
  .on("error", (err) => {
    console.error("server failed to start:", err);
  });
