const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.replace("Bearer ", "");

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ error: "Acesso negado. Token não fornecido." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ error: "Acesso negado. Usuário não encontrado." });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      error: "Token inválido.",
    });
  }
};

const adminMiddleware = async (req, res, next) => {
  try {
    await authMiddleware(req, res, () => {});

    if (req.user.role !== "admin") {
      return res.status(403).json({
        error: "Acesso negado. Permitido apenas a administradores.",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authMiddleware,
  adminMiddleware,
};
