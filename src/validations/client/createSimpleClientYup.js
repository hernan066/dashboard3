/* eslint-disable import/prefer-default-export */
import { regex } from "validations/regex";
import * as yup from "yup";

const { lettersAndSpaces, onlyNumbers } = regex;

export const createSimpleClientSchema = yup.object().shape({
  name: yup.string().required("Requerido").matches(lettersAndSpaces, "Solo letras"),
  lastName: yup.string().required("Requerido").matches(lettersAndSpaces, "Solo letras"),
  email: yup.string().email("Formato incorrecto").required("Requerido"),
  phone: yup.string().required("Requerido").matches(onlyNumbers, "Solo números"),
  dni: yup.number().required("Requerido"),
});
