// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import bodyParser from "body-parser";
// import authRoute from "./Routes/authRoute.js";
// dotenv.config();
// import { connectDB } from "./Models/db.js";
// import prodRoute from "./Routes/prodRoute.js";
// const app = express();
// const PORT = process.env.PORT || 8080;

// app.get("/hello", (req, res) => {
//   res.send("world");
// });
// app.use(express.json());
// app.use(bodyParser.json());
// app.use(cors());

// connectDB();
// app.use("/auth", authRoute);
// app.use("/products", prodRoute);
// app.listen(PORT, () => {
//   console.log(`Example app listening on port ${PORT}`);
// });
