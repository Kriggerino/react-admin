import React, { useEffect, useState } from "react";
import axios from "axios";
// ** MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

const StatisticsCard = () => {
  const [alertData, setAlertData] = useState({
    KCCount: 0,
    TBCount: 0,
    NCount: 0,
  });
  const salesData = [
    {
      stats: alertData.KCCount,
      title: "Khẩn cấp",
    },
    {
      stats: alertData.TBCount,
      title: "Trung bình",
    },
    {
      stats: alertData.NCount,
      title: "Nhẹ ",
    },
  ];
  const renderStats = () => {
    return salesData.map((item, index) => (
      <Grid item xs={12} sm={3} key={index}>
        <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Typography variant="h4">{item.title}</Typography>
            <Typography variant="h3">{item.stats}</Typography>
          </Box>
        </Box>
      </Grid>
    ));
  };
  useEffect(() => {
    axios
      .get("https://node-service-ihr4.onrender.com/getUrgent")
      .then((res) => {
        setAlertData({
          ...alertData,
          KCCount: res.data.Result[0].KCCount,
          TBCount: res.data.Result[1].TBCount,
          NCount: res.data.Result[2].NCount,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader
        title="Độ nghiêm trọng"
        action={
          <IconButton
            size="small"
            aria-label="settings"
            className="card-more-options"
            sx={{ color: "text.secondary" }}
          ></IconButton>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: "2rem !important",
            letterSpacing: "0.15px !important",
          },
        }}
      />
      <CardContent sx={{ pt: (theme) => `${theme.spacing(3)} !important` }}>
        <Grid
          container
          spacing={[5, 0]}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          {renderStats()}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StatisticsCard;
