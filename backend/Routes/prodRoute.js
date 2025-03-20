import { Router } from "express";
import express from "express";
import { ensureAuth } from "../Middlewares/Auth.js";
const router = express.Router();
// import { login, signup } from "../Controllers/AuthController.js";
// import {
//   signupvalidation,
//   loginvalidation,
// } from "../Middlewares/AuthValidation.js";
router.get("/", ensureAuth, (req, res) => {
    console.log(req.body);
  res.status (200).json([
    {
      name: "product1",
      price: 100,
    },
    {
      name: "product2",
      price: 200,
    },
    {
      name: "product3",
      price: 300,
    },
  ]);
});
// router.post("/register", signupvalidation, signup);

export default router;
