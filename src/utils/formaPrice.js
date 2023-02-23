/* eslint-disable import/prefer-default-export */
export const formatPrice = (value) => {
  // Crear formateador
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  // lo pasamos de euros a pesos
  return formatter.format(value); // $2,500.00
};
