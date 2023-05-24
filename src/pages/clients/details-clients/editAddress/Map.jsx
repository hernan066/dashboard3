/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import GoogleMapReact from "google-map-react";
import RoomIcon from "@mui/icons-material/Room";

function AnyReactComponent() {
  return <RoomIcon sx={{ width: 30, height: 30, color: "red" }} />;
}

function Map({ coords }) {
  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "600px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API_KEY }}
        defaultCenter={coords}
        center={coords}
        defaultZoom={18}
      >
        <AnyReactComponent lat={coords?.lat} lng={coords?.lng} text="Cliente" />
      </GoogleMapReact>
    </div>
  );
}

export default Map;
