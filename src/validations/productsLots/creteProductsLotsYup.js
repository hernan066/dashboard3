/* eslint-disable import/prefer-default-export */

import * as yup from "yup";

export const creteProductLotsSchema = yup.object().shape({
  // product: yup.string().required("Requerido"),
  supplier: yup.string().required("Requerido"),
  quantity: yup.number().required("Requerido"),
  cost: yup.number().required("Requerido"),
});
