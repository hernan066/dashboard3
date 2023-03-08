/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import { Box, Card, TextField } from "@mui/material";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addClient } from "redux/cartSlice";

function Address({ clients, setPage }) {
  const [filterUser, setFilterUser] = useState([]);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  console.log(clients);

  const handlerFilterChanges = (e) => {
    setSearch(e.target.value);
  };

  const handlerSearch = () => {
    const result = clients.filter((clientAddr) => {
      if (
        clientAddr.cuit.toString().includes(search) ||
        clientAddr.user.name.toString().toLowerCase().includes(search) ||
        clientAddr.user.lastName.toString().toLowerCase().includes(search)
      ) {
        return clientAddr;
      }
    });

    setFilterUser(result);
  };

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
          width: "100%",
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
            key={clientA.user.phone + clientA.user.name}
            sx={{
              display: "flex",
              border: "1px solid #ccc",
              padding: "5px",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <MDTypography variant="body2">{`DNI/CUIT:  ${clientA.cuit} || Nombre: ${clientA.user.name} ${clientA.user.lastName}`}</MDTypography>
            <MDButton
              color="info"
              size="small"
              onClick={() => {
                dispatch(addClient(clientA));
                setPage(1);
              }}
            >
              Cargar
            </MDButton>
          </Box>
        ))}
      </Card>
    </Box>
  );
}

export default Address;
/* TODO crear una busqueda de cliente en real time con debounce */
