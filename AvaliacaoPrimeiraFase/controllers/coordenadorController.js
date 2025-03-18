const Coordenador = require("../models/coordenador");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { nome, senha } = req.body;

  const coordenador = await Coordenador.findOne({ nome });
  if (!coordenador || !(await coordenador.verificarSenha(senha))) {
    return res.status(401).json({ message: "Credenciais inválidas!" });
  }

  const token = jwt.sign({ id: coordenador._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
};

const registrar = async (req, res) => {
  const { nome, senha } = req.body;

  const coordenadorExistente = await Coordenador.findOne({ nome });
  if (coordenadorExistente) {
    return res.status(400).json({ message: "Coordenador já cadastrado com esta matrícula!" });
  }

  const novoCoordenador = new Coordenador({ nome, senha });
  await novoCoordenador.save();

  res.status(201).json({ message: "Coordenador registrado com sucesso!" });
};

const obterToken = (req, res) => {
  const { id } = req.body;
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
};

module.exports = { login, registrar, obterToken };
