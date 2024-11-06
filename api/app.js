import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import postRoute from "./routes/post.route.js";
import authRoute from "./routes/auth.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors())

app.use("/api/posts",postRoute);
app.use("/api/auth",authRoute);
app.use("/api/test",testRoute);


app.use("/api/users",userRoute);

app.listen(9000, () => {
    console.log("Server is running!")
})