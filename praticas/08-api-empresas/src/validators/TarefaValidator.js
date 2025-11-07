const Joi = require("joi");
const { isValidObjectId } = require("./IDValidator");

const createTarefaSchema = Joi.object({
  titulo: Joi.string().required(),
  descricao: Joi.string().allow(""),
  projeto: Joi.string().custom((value, helpers) => {
    if (!isValidObjectId(value)) return helpers.error("any.invalid");
    return value;
  }).required(),
  responsavel: Joi.string().custom((value, helpers) => {
    if (!isValidObjectId(value)) return helpers.error("any.invalid");
    return value;
  }).required(),
  data_inicio: Joi.date().required(),
  data_fim: Joi.date().greater(Joi.ref("data_inicio")).required(),
  status: Joi.string().valid("Pendente", "Em andamento", "Concluída"),
});

const updateTarefaSchema = Joi.object({
  titulo: Joi.string(),
  descricao: Joi.string(),
  projeto: Joi.string().custom((value, helpers) => {
    if (!isValidObjectId(value)) return helpers.error("any.invalid");
    return value;
  }),
  responsavel: Joi.string().custom((value, helpers) => {
    if (!isValidObjectId(value)) return helpers.error("any.invalid");
    return value;
  }),
  data_inicio: Joi.date(),
  data_fim: Joi.date().greater(Joi.ref("data_inicio")),
  status: Joi.string().valid("Pendente", "Em andamento", "Concluída"),
});

module.exports = { createTarefaSchema, updateTarefaSchema };
