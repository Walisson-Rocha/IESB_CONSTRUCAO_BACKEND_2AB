const Joi = require("joi");
const { isValidObjectId } = require("./IDValidator");

const createProjetoSchema = Joi.object({
  nome: Joi.string().required(),
  descricao: Joi.string().allow(""),
  departamento: Joi.string().custom((value, helpers) => {
    if (!isValidObjectId(value)) return helpers.error("any.invalid");
    return value;
  }).required(),
  data_inicio: Joi.date().required(),
  data_fim: Joi.date().greater(Joi.ref("data_inicio")).required(),
});

const updateProjetoSchema = Joi.object({
  nome: Joi.string(),
  descricao: Joi.string(),
  departamento: Joi.string().custom((value, helpers) => {
    if (!isValidObjectId(value)) return helpers.error("any.invalid");
    return value;
  }),
  data_inicio: Joi.date(),
  data_fim: Joi.date().greater(Joi.ref("data_inicio")),
});

module.exports = { createProjetoSchema, updateProjetoSchema };
