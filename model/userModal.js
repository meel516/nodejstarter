import mongoose from "mongoose";
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  profilePic: {
    type: String,
  },
  userName: {
    type: String,
    unique: true,
  },
});
const userModal = mongoose.model("User", userSchema);
export default userModal;
