import userModal from "../model/userModal.js";

export const checkUser = async (user) => {
  try {
    let result = await userModal.findOne({
      email: user.email,
    });
    if (!result) {
      return false;
    } else {
      return {
        ...result.toObject(),
      };
    }
  } catch (err) {
    console.error("Error checking user:", err);
    return false;
  }
};
export const getAllUsers = async () => {
  try {
    const users = await userModal.find({}).select("-password -__v");
    return users;
  } catch (err) {
    console.error("Error fetching users:", err);
    return [];
  }
};
export const getUsers = async (email) => {
  const user = await userModal
    .findOne({ email: email })
    .select("-password -__v");

  return user.toObject();
};
export const postUser = async (user) => {
  try {
    const newUser = new userModal(user);
    const savedUser = await newUser.save();
    const plainUser = savedUser.toObject(); // convert to plain JS object
    delete plainUser.password;
    return plainUser;
  } catch (err) {
    console.error("Error saving user:", err);
    throw new Error("Failed to save user");
    return null;
  }
};
export const updateUser = async (userId, userData) => {
  try {
    const updatedUser = await userModal
      .findByIdAndUpdate(
        userId,
        {
          $set: userData,
        },
        {
          new: true,
        }
      )
      .lean();
    delete updatedUser.password;
    return updatedUser;
  } catch (err) {
    console.error("Error updating user:", err);
    throw new Error("Failed to update user");
    return null;
  }
};
