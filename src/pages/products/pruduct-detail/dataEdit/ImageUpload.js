/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */

import { useRef, useState } from "react";
import { IKContext, IKUpload } from "imagekitio-react";
import { LoadingButton } from "@mui/lab";
import colors from "assets/theme/base/colors";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import MDTypography from "components/MDTypography";

const publicKey = process.env.REACT_APP_IMAGEKIT_PUBLIC_KEY;
const urlEndpoint = process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT;
const authenticationEndpoint = `${process.env.REACT_APP_API_URL}/imageKit`;

function ImageUpload({ setUrlImage }) {
  const inputRefTest = useRef(null);
  const [loading, setLoading] = useState(false);

  const onError = (err) => {
    console.log("Error", err);
    setLoading(false);
  };

  const onSuccess = async (res) => {
    console.log("Success", res);

    setUrlImage(res.url);
    setLoading(false);
  };

  const onUploadStart = () => {
    console.log("start");
    setLoading(true);
  };

  return (
    <IKContext
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticationEndpoint={authenticationEndpoint}
    >
      <IKUpload
        fileName="product.png"
        onError={onError}
        onSuccess={onSuccess}
        /*  onUploadProgress={onUploadProgress} */
        onUploadStart={onUploadStart}
        /*   onChange={changeHandler} */
        /* validateFile={(file) =>
              file.size < 2000000 && file.fileType === "image"
            } */
        style={{ display: "none" }}
        inputRef={inputRefTest}
      />

      <LoadingButton
        type="submit"
        fullWidth
        variant="outlined"
        loading={loading}
        onClick={() => inputRefTest.current.click()}
        sx={{
          mt: 1,
          color: colors.info.main,
          height: "44px",
          borderColor: colors.info.main,
          "&:hover": {
            borderColor: colors.info.main,
          },
        }}
      >
        <FileUploadIcon />
        Subir imagen
      </LoadingButton>
      <MDTypography
        variant="body2"
        sx={{
          textAlign: "center",
          marginTop: "10px",
        }}
      >
        Imagen permitida, .jpg, .jpeg, .png, de 500px por 500px
      </MDTypography>
    </IKContext>
  );
}

export default ImageUpload;
