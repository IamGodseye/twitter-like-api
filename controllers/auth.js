import User from "../models/user";
import jwt from "jsonwebtoken";

import { hashPassword, comparePassword } from "../utils/auth";
export const signup = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;
    //     console.log(name, email, username, password);

    if (!name) return res.status(400).send("Name is required");
    if (!password || password.length < 6)
      return res
        .status(400)
        .send("Password is required and should be min of 6 characters");
    let userExist = await User.findOne({ email }).exec();
    if (userExist) return res.status(400).send("Email is taken");
    userExist = await User.findOne({ username }).exec();
    if (userExist) return res.status(400).send("Username is taken");
    const hashedPassword = await hashPassword(password);
    const user = new User({ name, email, username, password: hashedPassword });
    await user.save();

    res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error... Try Again...");
  }
};

export const login = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //     console.log(username, email, password);
    let user;
    if (username != undefined) {
      user = await User.findOne({ username }).exec();
      if (!user) return res.status(400).send("No user found");
      console.log("Login with username");
    }
    if (email != undefined) {
      user = await User.findOne({ email }).exec();
      if (!user) return res.status(400).send("No user found");
      console.log("Login with email");
    }
    //     console.log(user);

    const match = await comparePassword(password, user.password);
    if (!match) return res.status(400).send("Wrong Password!!!");
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    //dont send password
    user.password = undefined;

    //send token
    res.cookie("token", token, {
      httpOnly: true,
      //secure: true,
      //secure will only work in HTTPS
    });
    res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error... Try Again...");
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({ message: "Signout Sucess..." });
  } catch (err) {
    console.log(err);
  }
};
