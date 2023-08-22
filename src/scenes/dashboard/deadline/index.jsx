import { Card, CardContent, CardHeader, Grid, IconButton, Typography, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";

const DeadLine = () => {
  const [apiData, setApiData] = useState({
    id: "",
    message: "",
    contact: "",
    system_name: "",
  });
  useEffect(() => {
    axios
      .get("https://node-service-ihr4.onrender.com/dbwarning")
      .then((res) => {
        setApiData(res.data.Result);
      })
      .catch((err) => console.log(err));
  }, []);
  const dgColumn = [
    {
      field: "message",
      headerName: "Cảnh báo",
      flex: 1,
    },
    {
      field: "contact",
      headerName: "Liên lạc",
      flex: 1,
    },
    {
      field: "system_name",
      headerName: "Hệ thống",
    },
  ];
  return (
    <Card>
      <CardHeader
        title="Cảnh báo mới nhất"
        action={
          <IconButton
            size="small"
            aria-label="settings"
            className="card-more-options"
            sx={{ color: "text.secondary" }}
          ></IconButton>
        }
        sx={{ pb: 0}}
      />
      <CardContent sx={{ px: "16px"}}>
        <Grid container spacing={[5, 0]} sx={{
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
            fontSize: "0.85rem",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "rgba(244, 245, 250, 0.78)",
            borderBottom: "1px grey solid",
            fontSize: "0.85rem",
          },
        }}>
          <DataGrid
            rows={apiData}
            getRowId={apiData.id}
            columns={dgColumn}
            hideFooter
          />
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DeadLine;