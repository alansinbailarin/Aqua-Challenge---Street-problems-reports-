// composables/validation.js
import * as yup from "yup";

export const reportSchema = yup.object({
  title: yup.string().required("El título es obligatorio"),
  description: yup.string().required("La descripción es obligatoria"),
  gravity: yup.number().min(1).max(100).required("La gravedad es obligatoria"),
  status: yup.string().required("El estado es obligatorio"),
  leak: yup.string().required("El tipo de fuga es obligatorio"),
  impacts: yup
    .array()
    .min(1, "Debes seleccionar al menos un impacto")
    .required(),
  size: yup.string().required("El tamaño es obligatorio"),
  duration: yup.string().required("La duración es obligatoria"),
});
