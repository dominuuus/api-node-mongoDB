const userService = require("../services/userService");

class UserController {
  async getProfile(req, res) {
    try {
      const user = await userService.getUserById(req.user._id);
      res.json(user);
    } catch (error) {
      res.status(404).json({ message: "Perfil não encontrado" });
    }
  }

  async updateProfile(req, res) {
    try {
      const user = await userService.updateProfile(req.user._id, req.body);
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: "Erro ao utilizar perfil do usuário" });
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
      res.status(400).json({ message: "Erro. Senha não atualizada" });
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res
        .status(500)
        .json({
          message:
            "Erro inesperado. Não foi possível recuperar a lista de usuários",
        });
    }
  }

  async getUserByEmail(req, res) {
    try {
      const email = req.params.email;
      const user = await userService.getUserByEmail(email);
      res.json(user);
    } catch (error) {
      res.status(404).json({ message: "Erro. Usuário não localizado" });
    }
  }

  async deleteUser(req, res) {
    try {
      const userId = req.params.id;
      const user = await userService.deleteUser(userId);
      res.status(200).json({ message: "Usuário removido com sucesso" });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Erro. Não foi possível remover o usuário" });
    }
  }
}

module.exports = new UserController();
