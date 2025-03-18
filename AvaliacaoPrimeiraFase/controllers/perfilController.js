const Perfil = require('../models/perfil');
const Aluno = require('../models/aluno');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const criarPerfil = async (req, res) => {
  try {
    const { matricula, telefone, endereco, alunoId, senha } = req.body;

    const aluno = await Aluno.findById(alunoId);
    if (!aluno) {
      return res.status(404).json({ message: "Aluno não encontrado!" });
    }

    const novoPerfil = new Perfil({
      matricula,
      telefone,
      endereco,
      aluno: alunoId,
      senha,
    });

    await novoPerfil.save();

    await Aluno.updateOne(
      { _id: alunoId },
      { $set: { perfil: novoPerfil._id } }
    );

    res.json({
      message: "Perfil criado com sucesso!",
      perfil: novoPerfil,
    });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar perfil", error });
  }
};

const login = async (req, res) => {
  try {
    const { matricula, senha } = req.body;
    const perfil = await Perfil.findOne({ matricula });
    if (!perfil) {
      return res.status(404).json({ message: "Perfil não encontrado!" });
    }
  
    const senhaValida = await perfil.verificarSenha(senha);
    if (!senhaValida) {
      return res.status(401).json({ message: "Senha inválida!" });
    }
  
    res.json({ message: "Login realizado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao realizar login", error });
    }
  };


const obterTodosPerfis = async (req, res) => {
  try {
    const perfis = await Perfil.find().populate('aluno');
    res.json(perfis);
  } catch (error) {
    res.status(500).json({ message: "Erro ao obter perfis", error });
  }
};

const deletarPerfil = async (req, res) => {
  try {
    const { id } = req.params;

    const perfil = await Perfil.findById(id);
    if (!perfil) {
      return res.status(404).json({ message: "Perfil não encontrado!" });
    }

    await Perfil.deleteOne({ _id: id });
    res.json({ message: "Perfil removido com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar perfil", error });
  }
};

const editarPerfil = async (req, res) => {
  try {
    const { id } = req.params;
    const { matricula, telefone, endereco, alunoId, senha } = req.body;

    const perfil = await Perfil.findById(id);
    if (!perfil) {
      return res.status(404).json({ message: "Perfil não encontrado!" });
    }

    const perfilAtualizado = await Perfil.findByIdAndUpdate(
      id,
      { matricula, telefone, endereco, aluno: alunoId, senha },
      { new: true }
    );

    res.status(200).json({
      message: "Perfil atualizado com sucesso!",
      perfil: perfilAtualizado,
    });
  } catch (error) {
    res.status(500).json({ message: "Erro ao editar perfil", error });
  }
};

module.exports = { criarPerfil, login, obterTodosPerfis, deletarPerfil, editarPerfil };