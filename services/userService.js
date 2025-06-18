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
export const getUsers = async () => {
  try {
    const users = await userModal.find({});
    return users;
  } catch (err) {
    console.error("Error fetching users:", err);
    return [];
  }
};
export const postUser = async (user) => {
  try {
    const newUser = new userModal(user);
    const savedUser = await newUser.save();
    return savedUser;
  } catch (err) {
    console.error("Error saving user:", err);
    throw new Error("Failed to save user");
    return null;
  }
};
