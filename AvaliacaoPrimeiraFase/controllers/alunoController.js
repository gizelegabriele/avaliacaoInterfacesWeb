let Aluno = require("../models/aluno");

const criarAluno = async (req, res) => {
  try {
  const { nome, idade } = req.body;

  if (!nome || !idade) {
    return res.status(400).json({
      error: "Nome e idade são Campos Obrigatórios!"
    })
  }

  const novoAluno = new Aluno({
    nome, idade,
  });

  await novoAluno.save();

  res.status(201).json({
    message: "Aluno criado com sucesso!",
    aluno: novoAluno,
  });
} catch (error) {
    res.status(500).json({ error: "Não foi possível criar um novo aluno! Erro no Servidor" });
  }
};

const obterTodosAlunos = async (req, res) => {
  try {
    const alunos = await Aluno.find().populate('perfil');
    res.json(alunos);
  } catch (error) {
    res.status(500).json({ message: "Erro ao retornar todos os Alunos!", error });
  }
};

const deletarAluno = async (req, res) => {
  try {
    const { id } = req.params;

    const aluno = await Aluno.findById(id);
    if (!aluno) {
      return res.status(404).json({ message: "Aluno não foi encontrado!" });
    }

    await Aluno.deleteOne({ _id: id });
    res.json({ message: 'Aluno foi removido com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar/remover aluno.", error });
  }
};

const editarAluno = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, idade } = req.body;

    const aluno = await Aluno.findById(id);
    if (!aluno) {
      return res.status(404).json({ message: 'Aluno não encontrado! Confira o ID!!' });
    }

    let alunoAtualizado = await Aluno.findByIdAndUpdate(id, { nome, idade }, { new: true });
    res.status(200).json({
      message: 'Aluno atualizado com sucesso!',
      aluno: alunoAtualizado,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao editar aluno', error });
  }
};

module.exports = { criarAluno, obterTodosAlunos, deletarAluno, editarAluno };
