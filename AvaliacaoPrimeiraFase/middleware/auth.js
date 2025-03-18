require('dotenv').config();

const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: "Informe o Token para obter acesso" });
    }

    const verificarToken = jwt.verify(token, secret);
    req.userId = verificarToken.id;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido ou expirado. Lembre-se que expira a cada 10minutos", error });
  }
};

module.exports = auth;
