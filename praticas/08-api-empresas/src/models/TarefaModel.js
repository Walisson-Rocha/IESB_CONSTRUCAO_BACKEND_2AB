const mongoose = require("mongoose");

const TarefaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: { type: String },
  projeto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Projetos",
    required: true,
  },
  responsavel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Funcionarios",
    required: true,
  },
  data_inicio: { type: Date, required: true },
  data_fim: { type: Date, required: true },
  status: {
    type: String,
    enum: ["Pendente", "Em andamento", "Concluída"],
    default: "Pendente",
  },
});

TarefaSchema.pre("save", function (next) {
  if (this.data_fim <= this.data_inicio) {
    return next(new Error("A data_fim deve ser posterior à data_inicio."));
  }
  next();
});

module.exports = mongoose.model("Tarefas", TarefaSchema);
