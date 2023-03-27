/* eslint-disable import/prefer-default-export */
import { regex } from "validations/regex";
import * as yup from "yup";

const { lettersNumbersAndSpaces } = regex;

export const creteProductSchema = yup.object().shape({
  name: yup.string().required("Requerido").matches(lettersNumbersAndSpaces, "Solo letras"),
  brand: yup.string().required("Requerido").matches(lettersNumbersAndSpaces, "Solo letras"),
  unit: yup.string().required("Requerido").matches(lettersNumbersAndSpaces, "Solo letras"),
  type: yup.string().required("Requerido").matches(lettersNumbersAndSpaces, "Solo letras"),
  category: yup.string().required("Requerido"),
  /*  description: yup.string().required("Requerido"), */
});
