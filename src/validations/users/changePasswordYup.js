/* eslint-disable import/prefer-default-export */
// import { regex } from "validations/regex";
import * as Yup from "yup";

// const { lettersNumbersAndSpaces } = regex;

export const changePasswordSchema = Yup.object().shape({
  password: Yup.string().min(6, "6 caracteres mínimo").required("Requerido"),
  password2: Yup.string()
    .min(6, "6 caracteres mínimo")
    .required("Requerido")
    .oneOf([Yup.ref("password")], "Las contraseñas deben ser iguales"),
});
