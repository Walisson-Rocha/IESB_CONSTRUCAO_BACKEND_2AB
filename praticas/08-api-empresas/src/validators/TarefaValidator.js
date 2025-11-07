const yup = require("yup");
const { isValidObjectId } = require("./IDValidator");

const createTarefaSchema = yup.object({
  titulo: yup.string().required(),
  descricao: yup.string().allow(""),
  projeto: yup.string().custom((value, helpers) => {
    if (!isValidObjectId(value)) return helpers.error("any.invalid");
    return value;
  }).required(),
  responsavel: yup.string().custom((value, helpers) => {
    if (!isValidObjectId(value)) return helpers.error("any.invalid");
    return value;
  }).required(),
  data_inicio: yup.date().required(),
  data_fim: yup.date().greater(yup.ref("data_inicio")).required(),
  status: yup.string().valid("Pendente", "Em andamento", "Concluída"),
});

const updateTarefaSchema = yup.object({
  titulo: yup.string(),
  descricao: yup.string(),
  projeto: yup.string().custom((value, helpers) => {
    if (!isValidObjectId(value)) return helpers.error("any.invalid");
    return value;
  }),
  responsavel: yup.string().custom((value, helpers) => {
    if (!isValidObjectId(value)) return helpers.error("any.invalid");
    return value;
  }),
  data_inicio: yup.date(),
  data_fim: yup.date().greater(yup.ref("data_inicio")),
  status: yup.string().valid("Pendente", "Em andamento", "Concluída"),
});

module.exports = { createTarefaSchema, updateTarefaSchema };
