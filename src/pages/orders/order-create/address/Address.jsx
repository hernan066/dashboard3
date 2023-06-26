/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import { Box, Card, TextField } from "@mui/material";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addClient } from "redux/cartSlice";
import AddressForm from "./AddressForm";

function Address({ clientAddresses, setPage, zones, deliveryTrucks }) {
  const [filterUser, setFilterUser] = useState([]);
  const [search, setSearch] = useState("");
  const [manualForm, setManualForm] = useState(false);
  const { client } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  const handlerFilterChanges = (e) => {
    setSearch(e.target.value);
  };

  // console.log(clientAddresses);

  const handlerSearch = () => {
    const result = clientAddresses.filter((clientAddr) => {
      if (
        clientAddr.user.name.toString().toLowerCase().includes(search.toLowerCase()) ||
        clientAddr.user.lastName.toString().toLowerCase().includes(search.toLowerCase())
      ) {
        return clientAddr;
      }
    });
    console.log(search);
    console.log(result);
    setFilterUser(result);
  };

  const handleClick = () => setManualForm(true);

  return (
    <Box
      sx={{
        display: "flex",
        gap: "30px",
      }}
    >
      <Card
        sx={{
          display: "flex",

          flexDirection: "column",
          width: "50%",
          padding: "25px",
          alignSelf: "flex-start",
        }}
      >
        <MDTypography mb={2} variant="h6">
          Buscar cliente
        </MDTypography>

        <TextField
          value={search}
          label="Buscar por número de dni/cuit o nombre"
          onChange={handlerFilterChanges}
          fullWidth
        />
        <MDButton
          variant="outlined"
          color="info"
          onClick={handlerSearch}
          sx={{
            mt: 3,
            mb: 2,
          }}
        >
          Buscar
        </MDButton>
        {filterUser.length > 0 && <MDTypography variant="h6"> Resultados </MDTypography>}

        {filterUser.map((clientA) => (
          <Box
            key={clientA.address + clientA.user.name}
            sx={{
              display: "flex",
              border: "1px solid #ccc",
              padding: "5px",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <MDTypography variant="body2">{`${clientA.user.name} ${clientA.user.lastName} || ${clientA.address}`}</MDTypography>
            <MDButton color="info" size="small" onClick={() => dispatch(addClient(clientA))}>
              Cargar
            </MDButton>
          </Box>
        ))}
      </Card>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "50%",
          padding: "25px",
          alignSelf: "flex-start",
        }}
      >
        <MDTypography variant="h6">Datos de envío</MDTypography>
        {!client && (
          <MDButton
            color="info"
            variant="gradient"
            sx={{
              margin: "15px 0",
            }}
            onClick={handleClick}
          >
            Cargar manualmente
          </MDButton>
        )}
        {manualForm && (
          <AddressForm
            setManualForm={setManualForm}
            setPage={setPage}
            zones={zones}
            deliveryTrucks={deliveryTrucks}
          />
        )}

        {client && (
          <AddressForm
            setManualForm={setManualForm}
            setPage={setPage}
            zones={zones}
            deliveryTrucks={deliveryTrucks}
          />
        )}
      </Card>
    </Box>
  );
}

export default Address;
