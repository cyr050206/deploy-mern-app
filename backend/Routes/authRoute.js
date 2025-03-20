import { Router } from "express";
import express from "express";
const router = express.Router();
import { login, signup } from "../Controllers/AuthController.js";
import {
  signupvalidation,
  loginvalidation,
} from "../Middlewares/AuthValidation.js";
router.post("/login", loginvalidation, login);
router.post("/register", signupvalidation, signup);

export default router;
