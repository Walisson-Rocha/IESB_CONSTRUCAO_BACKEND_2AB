const express = require('express');
const app = express();

app.use(express.json());

// conexão com o banco
const mongoose = require('mongoose');
require('dotenv').config();

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const url = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(url)
  .then(() => {
    console.log("✅ Conectado ao banco MongoDB!!!!");
  })
  .catch(erro => {
    console.log("❌ Erro ao conectar no banco MongoDB: ", erro);
  });

// Rotas principais (Controllers)
const DepartamentoController = require('./controllers/DepartamentoController');
const CargoController = require('./controllers/CargoController');
const FuncionarioController = require('./controllers/FuncionarioController');
const ProjetoController = require('./controllers/ProjetoController');
const TarefaController = require('./controllers/TarefaController');

// Usa cada controller com seu prefixo de rota
app.use('/departamentos', DepartamentoController);
app.use('/cargos', CargoController);
app.use('/funcionarios', FuncionarioController);
app.use('/projetos', ProjetoController);
app.use('/tarefas', TarefaController);

// Rota inicial para teste
app.get('/', (req, res) => {
  res.json({ mensagem: '🚀 API de Empresas rodando com sucesso!' });
});

app.listen(3000, () => {
  console.log("Servidor rodando -> http://localhost:3000");
});
