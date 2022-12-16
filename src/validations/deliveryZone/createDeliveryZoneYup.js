/* eslint-disable import/prefer-default-export */
import { regex } from "validations/regex";
import * as yup from "yup";

const { lettersNumbersAndSpaces } = regex;

export const createDeliveryZoneSchema = yup.object().shape({
  name: yup
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
  cost: yup.number().required("Requerido"),
  zip: yup.number().required("Requerido"),
  east: yup
    .string()
    .required("Requerido")
    .matches(lettersNumbersAndSpaces, "Solo letras y números"),
  west: yup
    .string()
    .required("Requerido")
    .matches(lettersNumbersAndSpaces, "Solo letras y números"),
  north: yup
    .string()
    .required("Requerido")
    .matches(lettersNumbersAndSpaces, "Solo letras y números"),
  south: yup
    .string()
    .required("Requerido")
    .matches(lettersNumbersAndSpaces, "Solo letras y números"),
});
