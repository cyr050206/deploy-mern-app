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
// export default createServer(app);

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import authRoute from "../Routes/authRoute.js";
import prodRoute from "../Routes/prodRoute.js";
import { connectDB } from "../Models/db.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Connect DB
connectDB().catch(err => console.error("DB Connection Failed:", err));

// Routes
app.use("/auth", authRoute);
app.use("/products", prodRoute);

app.get("/hello", (req, res) => {
  res.send("world");
});

// ✅ Export as serverless function (No app.listen)
export default app;
// export default createServer(app);
