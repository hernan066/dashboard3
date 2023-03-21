/* eslint-disable import/prefer-default-export */

export const formatQuantity = (num) => (num % 1 === 0 ? num : num.toFixed(2));
