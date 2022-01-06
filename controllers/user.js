import Tweet from "../models/tweet";
import User from "../models/user";

export const follow = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);
  if (req.user._id === userId) {
    return res.status(400).send("You can't follow yourself i guess");
  }
  if (user == null) return res.sendStatus(404);
  console.log(req.user);
  var isFollowing = user.follower && user.follower.includes(req.user._id);
  var option = isFollowing ? "$pull" : "$addToSet";

  req.user = await User.findByIdAndUpdate(
    req.user._id,
    { [option]: { following: userId } },
    { new: true }
  ).catch((error) => {
    console.log(error);
    res.sendStatus(400);
  });

  User.findByIdAndUpdate(userId, {
    [option]: { follower: req.user._id },
  }).catch((error) => {
    console.log(error);
    res.sendStatus(400);
  });

  return res.status(200).send(req.user);
};

export const following = async (req, res) => {
  try {
    console.log(req.params);
    const { userId } = req.params;
    User.findById(userId)
      .populate("following", "_id name username")
      .exec()
      .then((following) => {
        return res.status(200).send(following);
      });
  } catch (err) {
    console.log(err);
    return res.send("Error... Try again...");
  }
};

export const follower = async (req, res) => {
  try {
    //     console.log(req.params);
    const { userId } = req.params;
    //     const follower = await
    User.findById(userId)
      .populate("follower", "_id name username")
      .exec()
      .then((follower) => {
        return res.status(200).send(follower);
      });
    //     return res.status(200).send(follower);
  } catch (err) {
    console.log(err);
    return res.send("Error... Try again...");
  }
};

export const feed = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    let tweet = [];
    console.log(user.following);
    for (let i = 0; i < user.following.length; i++) {
      console.log(user.following[i]);
      const array = await Tweet.find({ postedBy: user.following[i] }).exec();
      //       console.log(array);
      for (let i = 0; i < array.length; i++) {
        tweet.push(array[i]);
        // console.log(array[i]);
      }
    }
    //     await user.following.map((f) => {
    //       Tweet.find({ postedBy: f });
    //     });
    //     console.log(tweet);
    tweet.sort(function (a, b) {
      if (a.createdAt > b.createdAt) {
        return -1;
      } else if (a.createdAt < b.createdAt) {
        return 1;
      } else {
        return 0;
      }
    });
    res.json(tweet);
  } catch (err) {
    console.log(err);
    return res.send("Error... Try again...");
  }
};
