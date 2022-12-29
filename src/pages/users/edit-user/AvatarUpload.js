/* eslint-disable no-alert */
/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import { Alert, Box, Card, LinearProgress } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useEffect, useRef, useState } from "react";
import { IKContext, IKUpload } from "imagekitio-react";
import Swal from "sweetalert2";
import MDTypography from "components/MDTypography";
import colors from "assets/theme/base/colors";
import { usePutUserMutation } from "api/userApi";
import { useParams } from "react-router-dom";

const publicKey = process.env.REACT_APP_IMAGEKIT_PUBLIC_KEY;
const urlEndpoint = process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT;
const authenticationEndpoint = `${process.env.REACT_APP_API_URL}/imageKit`;

const imageMimeType = /image\/(png|jpg|jpeg)/i;

function AvatarUpload({ user }) {
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const inputRefTest = useRef(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [editUserMutation, { isLoading, isError }] = usePutUserMutation();

  const changeHandler = (e) => {
    const filePreview = e.target.files[0];
    if (!filePreview.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    setFile(filePreview);
  };

  useEffect(() => {
    let fileReader;
    let isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  const onError = (err) => {
    console.log("Error", err);
    setLoading(false);
    setError(true);
  };

  const onSuccess = async (res) => {
    console.log("Success", res);
    try {
      const editUserValues = {
        ...user,
        avatar: res.url,
      };
      await await editUserMutation({ id, ...editUserValues }).unwrap();

      setLoading(false);

      Swal.fire("OK", "Avatar cambiado exitosamente!!", "success");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError(true);
      setFileDataURL(null);
    }
  };

  const onUploadStart = () => {
    setLoading(true);
  };

  return (
    <Card
      sx={{
        textAlign: "center",
        padding: "30px",
        overflow: "hidden",
      }}
    >
      <MDTypography variant="h4">{user.name}</MDTypography>
      <MDTypography variant="body2">Id:{user._id}</MDTypography>

      <IKContext
        publicKey={publicKey}
        urlEndpoint={urlEndpoint}
        authenticationEndpoint={authenticationEndpoint}
      >
        <IKUpload
          fileName="avatar.png"
          onError={onError}
          onSuccess={onSuccess}
          /*  onUploadProgress={onUploadProgress} */
          onUploadStart={onUploadStart}
          onChange={changeHandler}
          /* validateFile={(file) =>
              file.size < 2000000 && file.fileType === "image"
            } */
          style={{ display: "none" }}
          inputRef={inputRefTest}
        />

        {inputRefTest && (
          <button
            onClick={() => inputRefTest.current.click()}
            type="button"
            style={{
              width: "200px",
              height: "200px",
              backgroundColor: "#ccc",
              margin: "20px",
              borderRadius: "50%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              border: "1px dashed  #333",
              cursor: "pointer",
              position: "relative",
            }}
          >
            {fileDataURL && (
              <Box
                sx={{
                  borderRadius: "50%",
                  width: "200px",
                  height: "200px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={fileDataURL}
                  alt="preview"
                  style={{ height: "100%", objectFit: "cover" }}
                />
              </Box>
            )}
            {!fileDataURL && (
              <>
                <Box
                  sx={{
                    position: "absolute",
                    zIndex: "10",
                    bottom: 15,
                    right: 15,
                    backgroundColor: colors.info.main,
                    color: "white",
                    borderRadius: "50%",
                    padding: "5px",
                  }}
                >
                  <AddAPhotoIcon sx={{ color: "white !important" }} />
                </Box>
                <Box
                  sx={{
                    borderRadius: "50%",
                    width: "200px",
                    height: "200px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={user.avatar}
                    alt="preview"
                    style={{ height: "100%", objectFit: "cover" }}
                  />
                </Box>
              </>
            )}
          </button>
        )}
        {(loading || isLoading) && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}

        <MDTypography variant="body2" /* color={colors.grey[500]} */>
          Allowed *.jpeg, *.jpg and *.png max size of 3.1 MB
        </MDTypography>
        {(error || isError) && (
          <Alert severity="error">Ha ocurrido un error, Avatar no cambiado</Alert>
        )}
      </IKContext>
    </Card>
  );
}

export default AvatarUpload;
