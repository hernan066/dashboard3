/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import MDBox from "components/MDBox";
import Loading from "components/DRLoading";
import { Alert, Card } from "@mui/material";
import { useGetAddressesClientQuery, useGetClientQuery } from "api/clientsApi";
import { useGetDeliveryZonesQuery } from "api/deliveryZoneApi";
import { useParams } from "react-router-dom";
import ClientAddressEdit from "./ClientAddressEdit";
import ClientAddressCreate from "./ClientAddressCreate";

function EditClientAddress() {
  const { id } = useParams();

  const { data: dataClient, isLoading: l1, error: e1 } = useGetClientQuery(id);
  const { data: zones, isLoading: l2, isError: e2 } = useGetDeliveryZonesQuery();
  const { data: clientAddress, isLoading: l3, isError: e3 } = useGetAddressesClientQuery(id);
  console.log(dataClient);
  return (
    <>
      <MDBox>
        {(l1 || l2 || l3) && <Loading />}
        {(e1 || e2 || e3) && <Alert severity="error">Ha ocurrido un error</Alert>}
        {zones &&
          dataClient &&
          clientAddress &&
          clientAddress.data.clientAddress.length > 0 &&
          clientAddress.data.clientAddress.map((address) => (
            <Card sx={{ margin: "10px 0" }}>
              <ClientAddressEdit
                zones={zones.data.deliveryZones}
                clientAddress={address}
                client={dataClient.data.client}
              />
            </Card>
          ))}
      </MDBox>
      {clientAddress && clientAddress.data.clientAddress.length === 0 && (
        <MDBox>
          {(l2 || l3) && <Loading />}
          {(e2 || e3) && <Alert severity="error">Ha ocurrido un error</Alert>}
          {zones && clientAddress && (
            <Card>
              <Alert severity="info">
                El cliente no tiene ninguna dirección registrada, este formulario le creara una.
              </Alert>
              <ClientAddressCreate
                client={dataClient.data.client}
                zones={zones.data.deliveryZones}
              />
            </Card>
          )}
        </MDBox>
      )}
    </>
  );
}

export default EditClientAddress;
