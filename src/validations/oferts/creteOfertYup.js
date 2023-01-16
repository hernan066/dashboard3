/* eslint-disable import/prefer-default-export */
import { regex } from "validations/regex";
import * as yup from "yup";

const { lettersNumbersAndSpaces } = regex;

export const creteOfertSchema = yup.object().shape({
  // product: yup.string().required("Requerido"),
  description: yup.string().required("Requerido").matches(lettersNumbersAndSpaces, "Solo letras"),
  basePrice: yup.number().required("Requerido"),
  visible: yup.string().required("Requerido"),
  ofert: yup.string().required("Requerido"),
});
