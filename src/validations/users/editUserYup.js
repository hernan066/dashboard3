/* eslint-disable import/prefer-default-export */
import { regex } from "validations/regex";
import * as yup from "yup";

const { lettersNumbersAndSpaces } = regex;

export const editUserSchema = yup.object().shape({
  name: yup.string().required("Requerido"),
  lastName: yup.string().required("Requerido"),
  email: yup.string().email("Formato incorrecto").required("Requerido"),
  // password: yup.string().min(6, "6 caracteres mínimo").required("Requerido"),
  phone: yup.string().required("Requerido"),
  role: yup.string().required("Requerido"),
  address: yup.string().matches(lettersNumbersAndSpaces, "Solo letras y números"),
  flor: yup.string().matches(lettersNumbersAndSpaces, "Solo letras y números"),
  department: yup.string().matches(lettersNumbersAndSpaces, "Solo letras y números"),
  province: yup.string().matches(lettersNumbersAndSpaces, "Solo letras y números"),
  city: yup.string().matches(lettersNumbersAndSpaces, "Solo letras y números"),
  // zip: yup.string().matches(validations.lettersNumbersAndSpaces,"Solo letras y números" ),
});
