const yup = require("yup");
const { isValidObjectId } = require("./IDValidator");

const createProjetoSchema = yup.object({
  nome: yup.string().required(),
  descricao: yup.string().allow(""),
  departamento: yup.string().custom((value, helpers) => {
    if (!isValidObjectId(value)) return helpers.error("any.invalid");
    return value;
  }).required(),
  data_inicio: yup.date().required(),
  data_fim: yup.date().greater(yup.ref("data_inicio")).required(),
});

const updateProjetoSchema = yup.object({
  nome: yup.string(),
  descricao: yup.string(),
  departamento: yup.string().custom((value, helpers) => {
    if (!isValidObjectId(value)) return helpers.error("any.invalid");
    return value;
  }),
  data_inicio: yup.date(),
  data_fim: yup.date().greater(yup.ref("data_inicio")),
});

module.exports = { createProjetoSchema, updateProjetoSchema };
