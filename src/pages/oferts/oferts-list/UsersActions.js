/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Box, CircularProgress, Fab } from "@mui/material";
import { useEffect, useState } from "react";
import { Check, Save } from "@mui/icons-material";
import { green } from "@mui/material/colors";
import { usePutOfertMutation } from "api/ofertApi";
// import { updateStatus } from "../../../actions/user";
// import { useValue } from "../../../context/ContextProvider";

function UsersActions({ params, rowId, setRowId }) {
  // const { dispatch } = useValue();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [editOfert, { isLoading, isError }] = usePutOfertMutation();

  const handleSubmit = async () => {
    setLoading(true);

    console.log(params.row);

    const { basePrice, retailPrice, price1, price2, price3, price4, _id } = params.row;
    const editOfertValues = {
      basePrice,
      retailPrice,
      prices: [
        {
          price1,
          price2,
          price3,
          price4,
        },
      ],
    };
    const id = _id;
    const result = await editOfert({ id, ...editOfertValues }).unwrap();
    // const result = await updateStatus({ role, active }, _id, dispatch);
    if (result) {
      setSuccess(true);
      setRowId(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (rowId === params.id && success) setSuccess(false);
  }, [rowId]);

  return (
    <Box
      sx={{
        m: 1,
        position: "relative",
      }}
    >
      {success ? (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: green[500],
            "&:hover": { bgcolor: green[700] },
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
          }}
          disabled={params.id !== rowId || loading}
          onClick={handleSubmit}
        >
          <Save />
        </Fab>
      )}
      {loading && (
        <CircularProgress
          size={52}
          sx={{
            color: green[500],
            position: "absolute",
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );
}

export default UsersActions;
