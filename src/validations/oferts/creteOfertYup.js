/* eslint-disable import/prefer-default-export */
import { regex } from "validations/regex";
import * as yup from "yup";

const { lettersNumbersAndSpaces } = regex;

export const creteOfertSchema = yup.object().shape({
  // product: yup.string().required("Requerido"),
  description: yup.string().required("Requerido").matches(lettersNumbersAndSpaces, "Solo letras"),
  price1: yup.number().required("Requerido"),
  price2: yup.number().required("Requerido"),
  price3: yup.number().required("Requerido"),
  quantity1: yup.number().required("Requerido"),
  quantity2: yup.number().required("Requerido"),
  quantity3: yup.number().required("Requerido"),
  visible: yup.string().required("Requerido"),
});
