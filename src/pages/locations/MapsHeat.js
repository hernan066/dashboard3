/* eslint-disable import/no-extraneous-dependencies */
import { Box } from "@mui/system";
import { GoogleMap, HeatmapLayerF, Marker, Polygon } from "@react-google-maps/api";
import { useMemo } from "react";
import { zones } from "./Zones";

function MapsHeat({ clientAddress }) {
  const filterClientAddress = clientAddress.filter((client) => client.lat);
  const dataHeat = filterClientAddress.map(
    (client) => new window.google.maps.LatLng(client.lat, client.lng)
  );

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

        <HeatmapLayerF data={dataHeat} options={{ radius: 40 }} />

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

export default MapsHeat;
