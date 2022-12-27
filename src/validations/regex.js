/* eslint-disable import/prefer-default-export */
export const regex = {
  lettersAndSpaces: /^[A-Za-zÁÉÍÓÚáéíóúñÑ_ ]+$|^ *$/g,
  lettersNumbersAndSpaces: /^[A-Z0-9a-zÁÉÍÓÚáéíóúñÑ_ ]+$|^ *$/g,
  onlyNumbers: /^[0-9]*$|^NULL$/,
};
