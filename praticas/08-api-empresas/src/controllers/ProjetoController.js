const express = require("express");
const router = express.Router();
const Projeto = require("../models/ProjetoModel");
const { createProjetoSchema, updateProjetoSchema } = require("../validators/ProjetoValidator");
const { isValidObjectId } = require("../validators/IDValidator");

// Criar
router.post("/", async (req, res) => {
  try {
    const { error } = createProjetoSchema.validate(req.body);
    if (error) return res.status(400).json({ erro: error.details[0].message });

    const novo = await Projeto.create(req.body);
    res.status(201).json(novo);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Listar
router.get("/", async (req, res) => {
  const dados = await Projeto.find().populate("departamento");
  res.json(dados);
});

// Buscar por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) return res.status(400).json({ erro: "ID inválido" });

  const item = await Projeto.findById(id).populate("departamento");
  if (!item) return res.status(404).json({ erro: "Projeto não encontrado" });
  res.json(item);
});

// Atualizar
router.put("/:id", async (req, res) => {
  const { error } = updateProjetoSchema.validate(req.body);
  if (error) return res.status(400).json({ erro: error.details[0].message });

  const atualizado = await Projeto.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!atualizado) return res.status(404).json({ erro: "Projeto não encontrado" });
  res.json(atualizado);
});

// Deletar
router.delete("/:id", async (req, res) => {
  const removido = await Projeto.findByIdAndDelete(req.params.id);
  if (!removido) return res.status(404).json({ erro: "Projeto não encontrado" });
  res.json({ mensagem: "Projeto removido com sucesso" });
});

module.exports = router;
