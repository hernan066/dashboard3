/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { LoadingButton } from "@mui/lab";
import { Alert, TextField } from "@mui/material";
import { usePutClientAddressMutation } from "api/clientsAddressApi";
import colors from "assets/theme/base/colors";
import MDTypography from "components/MDTypography";
import { useCallback, useMemo, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import Swal from "sweetalert2";

function DraggableMarker({ position, setPosition }) {
  const [draggable, setDraggable] = useState(false);

  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    []
  );
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  return (
    <Marker draggable={draggable} eventHandlers={eventHandlers} position={position} ref={markerRef}>
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable ? "Puedes arrastrar el marcador" : "Click aquí para arrastrar el marcador"}
        </span>
      </Popup>
    </Marker>
  );
}

function Leaflet({ coords, clientAddress }) {
  const [position, setPosition] = useState(coords);
  const positionCenter = [coords?.lat, coords?.lng];

  const [createClientAddress, { isLoading, isError }] = usePutClientAddressMutation();

  const handleSave = async () => {
    const data = {
      ...clientAddress,
      lat: position.lat,
      lng: position.lng,
    };
    const res = await createClientAddress({
      id: clientAddress._id,
      ...data,
    }).unwrap();
    if (res.ok) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Coordenadas guardadas con éxito",
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <MDTypography variant="h6" sx={{ textAlign: "center" }}>
        Valores de referencia generados por la dirección
      </MDTypography>
      <MapContainer
        center={positionCenter}
        zoom={17}
        scrollWheelZoom={false}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <DraggableMarker coords={coords} position={position} setPosition={setPosition} />
      </MapContainer>
      <TextField
        margin="normal"
        fullWidth
        name="lat"
        label="Latitud de referencia"
        value={position.lat}
      />
      <TextField
        margin="normal"
        fullWidth
        name="lng"
        label="Longitud de referencia"
        value={position.lng}
      />
      <LoadingButton
        variant="outlined"
        loading={isLoading}
        onClick={handleSave}
        sx={{
          mt: 1.5,
          mb: 2,
          mr: 2,
          color: `${colors.info.main}`,
          width: "100%",
          "&:hover": {
            borderColor: `${colors.info.focus}`,
          },
        }}
      >
        Guardar en base de datos
      </LoadingButton>
      {isError && <Alert severity="error">Error — Coordenadas no guardadas</Alert>}
    </div>
  );
}

export default Leaflet;
