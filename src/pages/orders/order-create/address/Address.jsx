/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import { Box, Card, TextField } from "@mui/material";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { useState } from "react";
import AddressForm from "./AddressForm";

function Address({ users }) {
  const [filterUser, setFilterUser] = useState([]);
  const [search, setSearch] = useState("");
  const [userAddress, setUserAddress] = useState(null);
  const [manualForm, setManualForm] = useState(false);

  const handlerFilterChanges = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      return setFilterUser([]);
    }
    const filtrar = (arrayToFilter) => {
      const result = arrayToFilter.filter((user) => {
        if (user.phone.toString().includes(e.target.value) && user.role.role === "CLIENT_ROLE") {
          return user;
        }
      });

      setFilterUser(result);
    };

    filtrar(users);
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
          label="Buscar por numero de telefono"
          onChange={handlerFilterChanges}
          fullWidth
          margin="normal"
        />
        {filterUser.length > 0 && <MDTypography variant="h6"> Resultados </MDTypography>}

        {filterUser.map((user) => (
          <Box
            key={user.phone}
            sx={{
              display: "flex",
              border: "1px solid #ccc",
              padding: "5px",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <MDTypography variant="body2">{`${user.phone} // ${user.name} ${user.lastName} // ${user.userAddresses[0].address}`}</MDTypography>
            <MDButton color="info" size="small" onClick={() => setUserAddress(user)}>
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
        {!userAddress && (
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
        {manualForm && <AddressForm setManualForm={setManualForm} />}

        {userAddress && <AddressForm userAddress={userAddress} setManualForm={setManualForm} />}
      </Card>
    </Box>
  );
}

export default Address;
