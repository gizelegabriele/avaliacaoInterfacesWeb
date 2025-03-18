const express = require("express");
const bodyParser = require("body-parser");
const auth = require("./middleware/auth"); 

const alunoRoutes = require("./routes/alunoRoutes.js");
const disciplinaRoutes = require("./routes/disciplinaRoutes.js");
const perfilRoutes = require("./routes/perfilRoutes.js");
const professorRoutes = require("./routes/professorRoutes.js");
const tarefaRoutes = require("./routes/tarefaRoutes.js");
const turmaRoutes = require("./routes/turmaRoutes.js");
const coordenadorRoutes = require("./routes/coordenadorRoutes.js");

const db = require("./database/db.js");

const app = express();
app.use(bodyParser.json());

app.use("/app/coordenador", coordenadorRoutes);

app.use("/app/aluno", auth, alunoRoutes);
app.use("/app/disciplina", auth, disciplinaRoutes);
app.use("/app/perfil", auth, perfilRoutes);
app.use("/app/professor", auth, professorRoutes);
app.use("/app/tarefa", auth, tarefaRoutes);
app.use("/app/turma", auth, turmaRoutes);

const port = 3000;
app.listen(port, () => {
    console.log(`A aplicação está rodando na porta ${port}`);
});