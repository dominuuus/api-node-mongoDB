const userService = require("../services/userService");

class UserController {
  async getProfile(req, res) {
    try {
      const user = await userService.getUserById(req.user._id);
      res.json(user);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async updateProfile(req, res) {
    try {
      const user = await userService.updateProfile(req.user._id, req.body);
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async changePassword(req, res) {
    try {
      const { oldPassword, newPassword } = req.body;
      const result = await userService.changePassword(
        req.user._id,
        oldPassword,
        newPassword
      );
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUserByEmail(req, res) {
    try {
      const email = req.params.email;
      const user = await userService.getUserByEmail(email);
      res.json(user);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const userId = req.params.id;
      const user = await userService.deleteUser(userId);
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new UserController();
