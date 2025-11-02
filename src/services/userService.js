const User = require("../models/User");

class UserService {
  async getUserById(userId) {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return user;
  }

  async updateProfile(userId, data) {
    const allowedFields = ["name", "email", "birthDate"];
    const updates = Object.keys(data).reduce((acc, key) => {
      if (allowedFields.includes(key)) acc[key] = data[key];
      return acc;
    }, {});

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) throw new Error("Usuário não encontrado");
    return user;
  }

  async changePassword(userId, oldPassword, newPassword) {
    const user = await User.findById(userId).select("+password");
    if (!user) throw new Error("Usuário não encontrado");

    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) throw new Error("Senha atual incorreta");

    user.password = newPassword;
    await user.save();
    return { message: "Senha alterada com sucesso" };
  }

  async getAllUsers() {
    return await User.find().select("-password");
  }

  async getUserByEmail(email) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return user;
  }

  async deleteUser(userId) {
    const user = await User.findByIdAndUpdate(
      userId,
      { isActive: false },
      { new: true }
    );
    if (!user) throw new Error("Usuário não encontrado");
    return user;
  }
}

module.exports = new UserService();
