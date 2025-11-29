import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";

import userRouter from "./routes/user.routes.js";
import companyRouter from "./routes/company.routes.js";
import jobRouter from "./routes/job.routes.js";
import applicationRouter from "./routes/application.routes.js";

dotenv.config();

const app = express();
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Multiple origins CORS setup
const allowedOrigins = [
    "http://localhost:5173", // Local dev
    "https://client-52j19lyzk-yash-kalamkars-projects.vercel.app", // Vercel preview
    "https://client-eight-self-95.vercel.app" // Vercel production
];

const corsOptions = {
    origin: function (origin, callback) {
        // allow requests with no origin (mobile apps, curl, etc.)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
};

app.use(cors(corsOptions));

// Test route
app.get("/", (req, res) => res.send("Server is running 🚀"));

// API routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/company", companyRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

