import User from "../models/user";
import Tweet from "../models/tweet";

export const tweet = async (req, res) => {
  try {
    const userId = req.user._id;
    const { content } = req.body;
    const tweet = new Tweet({ content, postedBy: userId });
    await tweet.save();
    console.log(tweet);

    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error... Try again...");
  }
};
export const likeTweet = async (req, res) => {
  try {
    const { tweetId } = req.params;
    const userId = req.user._id;
    const user = await User.findById(userId);
    //     console.log(user);
    var isLiked = user.likes && user.likes.includes(tweetId);
    var option = isLiked ? "$pull" : "$addToSet";
    req.user = await User.findByIdAndUpdate(
      userId,
      { [option]: { likes: tweetId } },
      { new: true }
    ).catch((error) => {
      console.log(error);
      res.sendStatus(400);
    });

    const tweet = await Tweet.findByIdAndUpdate(
      tweetId,
      { [option]: { likes: userId } },
      { new: true }
    ).catch((error) => {
      console.log(error);
      res.sendStatus(400);
    });
    console.log(tweet);
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error... Try again...");
  }
};
export const reTweet = async (req, res) => {
  try {
    const { tweetId } = req.params;
    const userId = req.user._id;
    const user = await User.findById(userId);
    //     console.log(user);
    var isRetweet = user.likes && user.retweets.includes(tweetId);
    var option = isRetweet ? "$pull" : "$addToSet";
    req.user = await User.findByIdAndUpdate(
      userId,
      { [option]: { retweets: tweetId } },
      { new: true }
    ).catch((error) => {
      console.log(error);
      res.sendStatus(400);
    });
    //     console.log(req.user);
    const tweet = await Tweet.findByIdAndUpdate(
      tweetId,
      { [option]: { retweetUsers: userId } },
      { new: true }
    ).catch((error) => {
      console.log(error);
      res.sendStatus(400);
    });
    console.log(tweet);
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error... Try again...");
  }
};
export const replyTo = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user._id;
    const { tweetId } = req.params;
    const tweet = new Tweet({ content, postedBy: userId, replyTo: tweetId });
    await tweet.save();

    console.log(tweet);
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error... Try again...");
  }
};

export const reTweetWithData = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user._id;
    const { tweetId } = req.params;
    const tweet = new Tweet({
      content,
      postedBy: userId,
      retweetData: tweetId,
    });
    await tweet.save();
    console.log(tweet);
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error... Try again...");
  }
};
