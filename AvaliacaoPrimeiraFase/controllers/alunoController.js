let Aluno = require("../models/aluno");

const criarAluno = async (req, res) => {
  try {
    const { nome, idade } = req.body;

    const alunoExistente = await Aluno.findOne({ nome });
    if (alunoExistente) {
      return res.status(400).json({ message: "Aluno já existe!" });
    }

    const novoAluno = new Aluno({ nome, idade });
    await novoAluno.save();

    res.json({
      message: "Aluno criado com sucesso!",
      aluno: novoAluno,
    });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar aluno", error });
  }
};

const obterTodosAlunos = async (req, res) => {
  try {
    const alunos = await Aluno.find().populate('perfil');
    res.json(alunos);
  } catch (error) {
    res.status(500).json({ message: "Erro ao obter alunos", error });
  }
};

const deletarAluno = async (req, res) => {
  try {
    const { id } = req.params;

    await Aluno.deleteOne({ _id: id });
    res.json({ message: 'Aluno removido com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar aluno", error });
  }
};

const editarAluno = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, idade } = req.body;

    let aluno = await Aluno.findByIdAndUpdate(id, { nome, idade });
    res.status(200).json({
      message: 'Aluno atualizado com sucesso!',
      aluno,
    });
  } catch (error) {
    res.status(500).json({ message: "Erro ao editar aluno", error });
  }
};

module.exports = { criarAluno, obterTodosAlunos, deletarAluno, editarAluno };
