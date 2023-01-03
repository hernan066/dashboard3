/* eslint-disable import/prefer-default-export */
import { regex } from "validations/regex";
import * as yup from "yup";

const { lettersNumbersAndSpaces } = regex;

export const createDeliverySubZoneSchema = yup.object().shape({
  deliveryZone: yup
    .string()
    .required("Requerido")
    .matches(lettersNumbersAndSpaces, "Solo letras y números"),
  name: yup
    .string()
    .required("Requerido")
    .matches(lettersNumbersAndSpaces, "Solo letras y números"),

  km2: yup.number().required("Requerido"),
  blocks: yup.number().required("Requerido"),
  busStop: yup.number().required("Requerido"),
  totalHouses: yup.number().required("Requerido"),
  clientHouses: yup.number().required("Requerido"),
  totalShops: yup.number().required("Requerido"),
  clientShops: yup.number().required("Requerido"),
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
