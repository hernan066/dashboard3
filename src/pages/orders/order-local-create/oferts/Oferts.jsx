/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import { Box, TextField } from "@mui/material";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import React, { useState } from "react";
import ProductCard from "./ProductCard";

function Oferts({ oferts }) {
  const [search, setSearch] = useState("");
  const [stock, setStock] = useState(true);

  const productsWithStockField = oferts.map((ofert) => {
    const stock = ofert.product.stock.reduce((acc, curr) => curr.stock + acc, 0);
    if (stock > 0) {
      return {
        ...ofert,
        existStock: true,
      };
    }
    return {
      ...ofert,
      existStock: false,
    };
  });

  const productWithStock = productsWithStockField.filter((product) => product.existStock);
  const allProducts = oferts;
  const [filterArr, setFilterArr] = useState(productWithStock);

  const filtrar = (arrayToFilter) => {
    const result = arrayToFilter.filter((ofert) => {
      if (ofert.description.toString().toLowerCase().includes(search.toLowerCase())) {
        return ofert;
      }
    });
    return result;
  };

  const handleClick = () => {
    setStock(!stock);
    stock ? setFilterArr(filtrar(productWithStock)) : setFilterArr(filtrar(allProducts));
  };

  const handlerFilterChanges = (e) => {
    setSearch(e.target.value);
    stock ? setFilterArr(filtrar(allProducts)) : setFilterArr(filtrar(productWithStock));
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: "20px",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <Box>
        {!stock && (
          <MDButton variant="gradient" color="info" onClick={handleClick}>
            Ofertas con stocks
          </MDButton>
        )}
        {stock && (
          <MDButton variant="outlined" color="info" onClick={handleClick}>
            Todas las ofertas
          </MDButton>
        )}
      </Box>

      <TextField
        type="text"
        fullWidth
        placeholder="Buscar..."
        onChange={handlerFilterChanges}
        value={search}
      />
      <Box
        sx={{
          display: "flex",

          flexDirection: "row",
          alignItems: "center",
          width: "100%",
        }}
      >
        <MDTypography variant="h6" sx={{ width: "48%" }}>
          Producto
        </MDTypography>
        <MDTypography variant="h6" sx={{ width: "17%" }}>
          Costo
        </MDTypography>
        <MDTypography variant="h6" sx={{ width: "17%" }}>
          Precio
        </MDTypography>
        <MDTypography variant="h6" sx={{ width: "17%" }}>
          Stock
        </MDTypography>
      </Box>
      {filterArr.map((product) => (
        <ProductCard product={product} key={product._id} />
      ))}
    </Box>
  );
}

export default Oferts;
