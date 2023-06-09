/* eslint-disable import/no-extraneous-dependencies */
import { Box } from "@mui/system";
import { GoogleMap, InfoWindow, Marker, Polygon } from "@react-google-maps/api";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { zones } from "./Zones";

const optionZones = {
  fillColor: "#e91e63",
  fillOpacity: 0.2,
  strokeColor: "blue",
  strokeOpacity: 1,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  geodesic: false,
  zIndex: 1,
};

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
    <Marker
      position={{ lat, lng }}
      onClick={handleOpen}
      icon={
        client.client.active
          ? "https://ik.imagekit.io/mrprwema7/geo-icon-16__2__FMgqGb84R.png?updatedAt=1686144731319"
          : null
      }
    >
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
  console.log(filterClientAddress.length);

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
  const zone1 = useMemo(
    () => ({
      ...optionZones,
      fillColor: "#e91e63",
    }),
    []
  );
  const zone2 = useMemo(
    () => ({
      ...optionZones,
      fillColor: "#7b809a",
    }),
    []
  );
  const zone3 = useMemo(
    () => ({
      ...optionZones,
      fillColor: "#1A73E8",
    }),
    []
  );
  const zone4 = useMemo(
    () => ({
      ...optionZones,
      fillColor: "#4CAF50",
    }),
    []
  );
  const zone5 = useMemo(
    () => ({
      ...optionZones,
      fillColor: "#fb8c00",
    }),
    []
  );
  const zone6 = useMemo(
    () => ({
      ...optionZones,
      fillColor: "#F44335",
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

        <Polygon paths={zones.zona1} options={zone1} />
        <Polygon paths={zones.zona2} options={zone2} />
        <Polygon paths={zones.zona3} options={zone3} />
        <Polygon paths={zones.zona4} options={zone4} />
        <Polygon paths={zones.zona5} options={zone5} />
        <Polygon paths={zones.zona6} options={zone6} />
      </GoogleMap>
    </Box>
  );
}

export default MapsLocations;
