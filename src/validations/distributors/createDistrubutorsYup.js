/* eslint-disable import/prefer-default-export */
import { regex } from "validations/regex";
import * as yup from "yup";

const { lettersNumbersAndSpaces, onlyNumbers } = regex;

export const creteDistributorsSchema = yup.object().shape({
  businessName: yup
    .string()
    .required("Requerido")
    .matches(lettersNumbersAndSpaces, "Solo letras y números"),
  cuit: yup.string().required("Requerido").matches(onlyNumbers, "Solo números"),
  email: yup.string().email("Formato incorrecto").required("Requerido"),
  phone: yup.string().required("Requerido").matches(onlyNumbers, "Solo números"),
  address: yup
    .string()
    .required("Requerido")
    .matches(lettersNumbersAndSpaces, "Solo letras y números"),
  province: yup
    .string()
    .required("Requerido")
    .matches(lettersNumbersAndSpaces, "Solo letras y números"),
  city: yup
    .string()
    .required("Requerido")
    .matches(lettersNumbersAndSpaces, "Solo letras y números"),
  zip: yup.number().required("Requerido"),
  maximum: yup.number().required("Requerido"),
});
