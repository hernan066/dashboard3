/* eslint-disable import/prefer-default-export */
// import { regex } from "validations/regex";
import * as yup from "yup";

// const { lettersNumbersAndSpaces } = regex;

export const editUserSchema = yup.object().shape({
  name: yup.string().required("Requerido"),
  lastName: yup.string().required("Requerido"),
  email: yup.string().email("Formato incorrecto").required("Requerido"),
  // password: yup.string().min(6, "6 caracteres mínimo").required("Requerido"),
  phone: yup.string().required("Requerido"),
  role: yup.string().required("Requerido"),
});
