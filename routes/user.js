import express from "express";
const router = express.Router();
import { follow, follower, following, feed } from "../controllers/user";
import { requireSignin } from "../middlewares";
router.get("/:userId/follower", follower);
router.get("/:userId/following", following);
router.put("/:userId/follow", requireSignin, follow);
router.get("/feed", requireSignin, feed);
module.exports = router;
