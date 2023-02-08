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
    if (e.target.value === "") {
      return setFilterUser([]);
    }
    const filtrar = (arrayToFilter) => {
      const result = arrayToFilter.filter((clientAddr) => {
        if (
          clientAddr.user.phone.toString().includes(e.target.value) ||
          clientAddr.user.name.toString().includes(e.target.value) ||
          clientAddr.user.lastName.toString().includes(e.target.value)
        ) {
          return clientAddr;
        }
      });

      setFilterUser(result);
    };

    filtrar(clientAddresses);
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
        <MDTypography variant="h6">Buscar usuario</MDTypography>

        <TextField
          value={search}
          label="Buscar por número de teléfono o nombre"
          onChange={handlerFilterChanges}
          fullWidth
          margin="normal"
        />
        {filterUser.length > 0 && <MDTypography variant="h6"> Resultados </MDTypography>}

        {filterUser.map((clientA) => (
          <Box
            key={clientA.user.phone}
            sx={{
              display: "flex",
              border: "1px solid #ccc",
              padding: "5px",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <MDTypography variant="body2">{`${clientA.user.phone} // ${clientA.user.name} ${clientA.user.lastName} // ${clientA.address}`}</MDTypography>
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
