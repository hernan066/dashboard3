/* eslint-disable import/prefer-default-export */
import { regex } from "validations/regex";
import * as yup from "yup";

const { lettersNumbersAndSpaces } = regex;

export const createClientAddressSchema = yup.object().shape({
  address: yup
    .string()
    .required("Requerido")
    .matches(lettersNumbersAndSpaces, "Solo letras y números"),
  flor: yup.string().matches(lettersNumbersAndSpaces, "Solo letras y números"),
  department: yup.string().matches(lettersNumbersAndSpaces, "Solo letras y números"),
  province: yup
    .string()
    .required("Requerido")
    .matches(lettersNumbersAndSpaces, "Solo letras y números"),
  city: yup
    .string()
    .required("Requerido")
    .matches(lettersNumbersAndSpaces, "Solo letras y números"),
  deliveryZone: yup
    .string()
    .required("Requerido")
    .matches(lettersNumbersAndSpaces, "Solo letras y números"),
  type: yup
    .string()
    .required("Requerido")
    .matches(lettersNumbersAndSpaces, "Solo letras y números"),
  zip: yup.number().required("Requerido"),
});
