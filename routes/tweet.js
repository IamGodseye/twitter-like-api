import express from "express";
const router = express.Router();
import {
  tweet,
  likeTweet,
  reTweet,
  replyTo,
  reTweetWithData,
} from "../controllers/tweet";
import { requireSignin } from "../middlewares";
router.post("/create-tweet", requireSignin, tweet);
router.post("/:tweetId/like-tweet", requireSignin, likeTweet);
router.post("/:tweetId/retweet", requireSignin, reTweet);
router.post("/:tweetId/reply-tweet", requireSignin, replyTo);
router.post("/:tweetId/retweet-with-data", requireSignin, reTweetWithData);

module.exports = router;
