const User = require("../models/User");
const jwt = require("jsonwebtoken");

class AuthService {
  async registerUser(name, email, password, birthDate, role, requesterRole) {
    if (role === "admin" && requesterRole !== "admin") {
      throw new Error("Apenas administradores podem criar outros administradores");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("Email já está em uso");
    }

    const user = new User({ name, email, password, birthDate, role });
    const savedUser = await user.save();
    const token = this.generateToken(user.id, user.role);

    return { user: savedUser, token };
  }

  async loginUser(email, password) {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new Error("Credenciais inválidas");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error("Credenciais inválidas");
    }

    const token = this.generateToken(user.id, user.role);

    return { user, token };
  }

  generateToken(userId, role) {
    return jwt.sign({ id: userId, role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }
}

module.exports = new AuthService();
