import express from "express";
const router = express.Router();
import { signup, login, logout } from "../controllers/auth";
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
