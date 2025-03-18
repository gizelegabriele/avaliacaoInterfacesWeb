const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const perfilSchema = new mongoose.Schema({
  matricula: { type: String, required: true, unique: true },
  telefone: { type: String, required: true },
  endereco: { type: String, required: true },
  aluno: { type: mongoose.Schema.Types.ObjectId, ref: 'Aluno', unique: true },
  senha: { type: String, required: true },
});

perfilSchema.pre('save', async function (next) {
  if (this.isModified('senha')) {
    this.senha = await bcrypt.hash(this.senha, 10);
  }
  next();
});

perfilSchema.methods.verificarSenha = async function (senha) {
  return await bcrypt.compare(senha, this.senha);
};

module.exports = mongoose.model('Perfil', perfilSchema);