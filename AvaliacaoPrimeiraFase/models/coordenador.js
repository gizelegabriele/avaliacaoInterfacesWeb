const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const coordenadorSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  senha: { type: String, required: true }, 
});

coordenadorSchema.pre("save", async function (next) {
  if (this.isModified("senha")) {
    this.senha = await bcrypt.hash(this.senha, 10);
  }
  next();
});

coordenadorSchema.methods.verificarSenha = async function (senha) {
  return await bcrypt.compare(senha, this.senha);
};

module.exports = mongoose.model("Coordenador", coordenadorSchema);
