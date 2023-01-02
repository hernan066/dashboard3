/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import Address from "./address/Address";
import Cart from "./cart/Cart";
import Oferts from "./oferts/Oferts";

function CreateOrder({ oferts: ofertsList, clientAddresses, zones, deliveryTrucks }) {
  const { oferts } = ofertsList.data;
  const [page, setPage] = useState(0);
  const { products } = useSelector((store) => store.cart);

  const handleChange = (event, newValue) => {
    setPage(newValue);
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
      <Tabs value={page} onChange={handleChange} centered>
        <Tab label="1.Datos de envío" />
        <Tab label="2.Cargar ofertas" />
        <Tab label={`3.Confirmar pedido(${products.length})`} />
      </Tabs>

      {page === 0 && (
        <Address
          clientAddresses={clientAddresses}
          setPage={setPage}
          zones={zones}
          deliveryTrucks={deliveryTrucks}
        />
      )}
      {page === 1 && <Oferts oferts={oferts} />}
      {page === 2 && <Cart />}
    </Box>
  );
}

export default CreateOrder;
