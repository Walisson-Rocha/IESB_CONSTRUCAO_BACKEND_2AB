const mongoose = require("mongoose");

const ProjetoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String },
  departamento: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Departamentos",
    required: true,
  },
  data_inicio: { type: Date, required: true },
  data_fim: { type: Date, required: true },
});

ProjetoSchema.pre("save", function (next) {
  if (this.data_fim <= this.data_inicio) {
    return next(new Error("A data_fim deve ser posterior à data_inicio."));
  }
  next();
});

module.exports = mongoose.model("Projetos", ProjetoSchema);
