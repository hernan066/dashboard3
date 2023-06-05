/* eslint-disable import/no-extraneous-dependencies */
import { Box } from "@mui/system";
import { GoogleMap, InfoWindow, Marker, Polygon } from "@react-google-maps/api";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { zones } from "./Zones";

function CustomMarker({ lat, lng, client }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const divStyle = {
    background: `white`,
    border: `1px solid #ccc`,
    padding: 15,
    textAlign: "center",
  };
  return (
    <Marker position={{ lat, lng }} onClick={handleOpen}>
      {open && (
        <InfoWindow position={{ lat, lng }} onCloseClick={handleClose}>
          <div style={divStyle}>
            <h2>
              {client.user.name} {client.user.lastName}
            </h2>
            <h3>{client.address}</h3>
            <h3 style={{ marginBottom: "5px" }}>{client.deliveryZone.name}</h3>
            <Link to={`/clientes/detalle/${client.client._id}`}>Ver Cliente</Link>
          </div>
        </InfoWindow>
      )}
    </Marker>
  );
}

function MapsLocations({ clientAddress }) {
  const filterClientAddress = clientAddress.filter((client) => client.lat);

  const center = useMemo(() => ({ lat: -34.570428718491605, lng: -58.743382510475065 }), []); // -34.570428718491605, -58.743382510475065
  const options = useMemo(
    () => ({
      clickableIcons: false,
      styles: [
        {
          featureType: "all",
          elementType: "labels.icon",
          stylers: [{ visibility: "off" }],
        },
      ],
    }),
    []
  );
  const optionsPolygon = useMemo(
    () => ({
      fillColor: "lightblue",
      fillOpacity: 0.3,
      strokeColor: "blue",
      strokeOpacity: 1,
      strokeWeight: 2,
      clickable: false,
      draggable: false,
      editable: false,
      geodesic: false,
      zIndex: 1,
    }),
    []
  );

  return (
    <Box p={3}>
      <GoogleMap zoom={13} center={center} mapContainerClassName="map-container" options={options}>
        <Marker position={center} icon="https://i.ibb.co/nbm4b4x/pngegg.png" />

        {filterClientAddress.map((client) => (
          <CustomMarker lat={client.lat} lng={client.lng} client={client} key={client._id} />
        ))}

        <Polygon paths={zones.zona1} options={optionsPolygon} />
        <Polygon paths={zones.zona2} options={optionsPolygon} />
        <Polygon paths={zones.zona3} options={optionsPolygon} />
        <Polygon paths={zones.zona4} options={optionsPolygon} />
        <Polygon paths={zones.zona5} options={optionsPolygon} />
        <Polygon paths={zones.zona6} options={optionsPolygon} />
      </GoogleMap>
    </Box>
  );
}

export default MapsLocations;
