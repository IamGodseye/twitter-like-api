import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;
const userSchema = new Schema(
  {
    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, unique: true },
    name: { type: String, required: true, trim: true },
    password: { type: String, required: true, min: 6, max: 64 },
    following: [{ type: ObjectId, ref: "User" }],
    follower: [{ type: ObjectId, ref: "User" }],
    likes: [{ type: ObjectId, ref: "Tweet" }],
    retweets: [{ type: ObjectId, ref: "Tweet" }],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
