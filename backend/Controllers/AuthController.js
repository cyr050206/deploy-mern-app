import express from "express";
import UserModel from "../Models/USer.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }
    const newUser = new UserModel({ name, email, password });
    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const login = async (req, res) => {
  const errormsg = "Invalid credentials";
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: errormsg, success: false });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: errormsg, success: false });
    }
    const jwtToken = jwt.sign(
      { email: user.email, id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: user, token: jwtToken, success: true });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
