import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;
const tweetSchema = new Schema(
  {
    content: { type: String, trim: true },
    postedBy: { type: ObjectId, ref: "User" },
    likes: [{ type: ObjectId, ref: "User" }],
    retweetUsers: [{ type: ObjectId, ref: "User" }],
    retweetData: { type: ObjectId, ref: "Tweet" },
    replyTo: { type: ObjectId, ref: "Tweet" },
    pinned: Boolean,
  },
  { timestamps: true }
);
export default mongoose.model("Tweet", tweetSchema);
