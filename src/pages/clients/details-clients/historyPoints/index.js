import { Alert } from "@mui/material";
import { useGetAllPointsByClientQuery } from "api/pointsApi";
import Loading from "components/DRLoading";
import MDBox from "components/MDBox";
import { useParams } from "react-router-dom";
import TableListPoints from "./TableListPoints";

function HistoryPoints() {
  const { id } = useParams();
  const { data: dataPoints, isLoading: l1, isError: e1 } = useGetAllPointsByClientQuery(id);
  console.log(dataPoints);

  return (
    <MDBox>
      {l1 && <Loading />}
      {e1 && <Alert severity="error">Ha ocurrido un error</Alert>}
      {dataPoints && <TableListPoints points={dataPoints.data.points} />}
    </MDBox>
  );
}

export default HistoryPoints;
