const authService = require("../services/authService");

class AuthController {
  async register(req, res) {
    try {
      const { name, email, password, birthDate, role } = req.body;

      if (!name || !email || !password || !birthDate) {
        return res
          .status(400)
          .json({ message: "Todos os campos são obrigatórios" });
      }

      const { user, token } = await authService.registerUser(
        name,
        email,
        password,
        birthDate,
        role
      );

      res.status(201).json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          birthDate: user.birthDate,
          role: user.role,
        },
        token,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email e senha são obrigatórios" });
      }

      const { user, token } = await authService.loginUser(email, password);

      res.status(201).json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          birthDate: user.birthDate,
          role: user.role,
        },
        token,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new AuthController();
