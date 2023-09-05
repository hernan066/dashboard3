export const getListProducts = (orders) => {
  const listOfProducts = orders.map((product) => product.orderItems);

  const list = [];
  for (let i = 0; i < listOfProducts.length; i++) {
    const element = listOfProducts[i];
    for (let x = 0; x < element.length; x++) {
      list.push(element[x]);
    }
  }

  return list;
};

export const repeatSum = (arr) => {
  const arrProductsNonDupli = [];
  const arrProductsIdCounted = [];
  arr.forEach((product, indxA, arrProducts) => {
    // validar si el product ya fue contado en la busqueda de duplicados
    const isCountryCounted = arrProductsIdCounted.includes(product.productId);
    // Si no ha sido contado
    if (!isCountryCounted) {
      arrProductsIdCounted.push(product.productId);

      // Buscar cuantas coincidencias existen del product en el array
      const countriesToCount = arrProducts.filter((ele) => ele.productId === product.productId);

      const country =
        countriesToCount.length > 1
          ? {
              ...product,
              totalQuantity: countriesToCount.reduce((acc, cur) => acc + cur.totalQuantity, 0),
              totalPrice: countriesToCount.reduce((acc, cur) => acc + cur.totalPrice, 0),
            }
          : product;

      arrProductsNonDupli.push(country);
    }
  });

  console.log(arrProductsNonDupli);
  return arrProductsNonDupli;
};
