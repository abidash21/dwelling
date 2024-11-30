import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import path from "path";

import postRoute from "./routes/post.route.js";
import authRoute from "./routes/auth.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";

const app = express();
dotenv.config();

const _dirname = path.resolve();

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors({
    origin: "https://dwelling-4.onrender.com",
    credentials: true}))

app.use("/api/posts",postRoute);
app.use("/api/auth",authRoute);
app.use("/api/test",testRoute);


app.use("/api/users",userRoute);

app.use(express.static(path.join(_dirname, "/client/dist")));
app.get('*', (req,res) => {
    res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"));
})

app.listen(9000, () => {
    console.log("Server is running!")
})