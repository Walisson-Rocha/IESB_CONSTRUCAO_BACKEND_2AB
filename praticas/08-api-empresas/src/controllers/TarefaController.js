const express = require("express");
const router = express.Router();
const Tarefa = require("../models/TarefaModel");
const { createTarefaSchema, updateTarefaSchema } = require("../validators/TarefaValidator");
const { isValidObjectId } = require("../validators/IDValidator");

// Criar
router.post("/", async (req, res) => {
  try {
    const { error } = createTarefaSchema.validate(req.body);
    if (error) return res.status(400).json({ erro: error.details[0].message });

    const nova = await Tarefa.create(req.body);
    res.status(201).json(nova);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Listar
router.get("/", async (req, res) => {
  const dados = await Tarefa.find().populate(["projeto", "responsavel"]);
  res.json(dados);
});

// Buscar por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) return res.status(400).json({ erro: "ID inválido" });

  const item = await Tarefa.findById(id).populate(["projeto", "responsavel"]);
  if (!item) return res.status(404).json({ erro: "Tarefa não encontrada" });
  res.json(item);
});

// Atualizar
router.put("/:id", async (req, res) => {
  const { error } = updateTarefaSchema.validate(req.body);
  if (error) return res.status(400).json({ erro: error.details[0].message });

  const atualizado = await Tarefa.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!atualizado) return res.status(404).json({ erro: "Tarefa não encontrada" });
  res.json(atualizado);
});

// Deletar
router.delete("/:id", async (req, res) => {
  const removido = await Tarefa.findByIdAndDelete(req.params.id);
  if (!removido) return res.status(404).json({ erro: "Tarefa não encontrada" });
  res.json({ mensagem: "Tarefa removida com sucesso" });
});

module.exports = router;
