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
        console.log(res);
        setApiData(res.data.Result);
      })
      .catch((err) => console.log(err));
  }, []);
  const dgColumn = [
    {
      field: "message",
      headerName: "Canh bao",
      flex: 1,
    },
    {
      field: "contact",
      headerName: "Lien lac",
      flex: 1,
    },
    {
      field: "system_name",
      headerName: "He thong",
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
        <Grid container spacing={[5, 0]}>
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