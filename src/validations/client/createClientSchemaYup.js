/* eslint-disable import/prefer-default-export */
// import { regex } from "validations/regex";
import * as yup from "yup";

// const { lettersNumbersAndSpaces, onlyNumbers } = regex;

export const createClientSchema = yup.object().shape({
  // user: yup.string().required("Requerido"),
  clientType: yup.string().required("Requerido"),
  clientCategory: yup.string().required("Requerido"),
  cuit: yup.number().required("Requerido"),
  contactMeans: yup.string().required("Requerido"),
  campaignName: yup.string().required("Requerido"),
});
