/* eslint-disable no-unused-vars */
import MDBox from "components/MDBox";
import Loading from "components/DRLoading";
import { Alert, Card } from "@mui/material";
import { useGetClientsQuery, useGetAddressesClientQuery } from "api/clientsApi";
import { useGetDeliveryZonesQuery } from "api/deliveryZoneApi";
import { useParams } from "react-router-dom";
import ClientAddressEdit from "./ClientAddressEdit";

function EditClientAddress() {
  const { id } = useParams();
  const { data: clients, isLoading: l1, isError: e1 } = useGetClientsQuery();
  const { data: zones, isLoading: l2, isError: e2 } = useGetDeliveryZonesQuery();
  const { data: clientAddress, isLoading: l3, isError: e3 } = useGetAddressesClientQuery(id);

  console.log(clientAddress);

  return (
    <MDBox>
      {(l1 || l2 || l3) && <Loading />}
      {(e1 || e2 || e3) && <Alert severity="error">Ha ocurrido un error</Alert>}
      {clients &&
        zones &&
        clientAddress &&
        clientAddress.data.clientAddress.map((address) => (
          <Card sx={{ margin: "10px 0" }}>
            <ClientAddressEdit
              clients={clients.data.clients}
              zones={zones.data.deliveryZones}
              clientAddress={address}
            />
          </Card>
        ))}
    </MDBox>
  );
}

export default EditClientAddress;
