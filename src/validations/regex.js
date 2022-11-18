/* eslint-disable import/prefer-default-export */
export const regex = {
  lettersAndSpaces: /^[ÁÉÍÓÚA-Za-záéíóú]+(\s+[ÁÉÍÓÚA-Z]?[a-záéíóú]+)*$|^ *$/,
  lettersNumbersAndSpaces: /^[A-Z0-9a-zÁÉÍÓÚáéíóúñÑ ]+$|^ *$/g,
  onlyNumbers: /^[0-9]*$|^NULL$/,
};
