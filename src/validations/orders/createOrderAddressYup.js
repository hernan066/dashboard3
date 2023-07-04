/* eslint-disable import/prefer-default-export */
import { regex } from "validations/regex";
import * as yup from "yup";

const { lettersNumbersAndSpaces, lettersAndSpaces } = regex;

export const creteOrderAddressSchema = yup.object().shape({
  name: yup.string().required("Requerido").matches(lettersAndSpaces, "Solo letras"),
  lastName: yup.string().required("Requerido").matches(lettersAndSpaces, "Solo letras"),
  phone: yup.string().required("Requerido"),
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
  zip: yup.number().required("Requerido"),
  lat: yup.number().required("Requerido"),
  lng: yup.number().required("Requerido"),
  shippingCost: yup.number().required("Requerido"),
  deliveryZone: yup.string().required("Requerido"),
  deliveryTruck: yup.string().required("Requerido"),
});
