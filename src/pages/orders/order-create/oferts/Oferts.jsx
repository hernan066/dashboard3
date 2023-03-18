/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import { Box, TextField } from "@mui/material";
import React, { useState } from "react";
import ProductCard from "./ProductCard";

function Oferts({ oferts }) {
  const [filterOfert, setfilterOfert] = useState(oferts);
  const [search, setSearch] = useState("");

  const filtrar = (arrayToFilter) => {
    const result = arrayToFilter.filter((ofert) => {
      if (ofert.description.toString().toLowerCase().includes(search.toLowerCase())) {
        return ofert;
      }
    });
    setfilterOfert(result);
  };

  const handlerFilterChanges = (e) => {
    setSearch(e.target.value);
    filtrar(oferts);
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
      <TextField
        type="text"
        fullWidth
        placeholder="Buscar..."
        onChange={handlerFilterChanges}
        value={search}
      />
      {filterOfert.map((product) => (
        <ProductCard product={product} key={product._id} />
      ))}
    </Box>
  );
}

export default Oferts;
