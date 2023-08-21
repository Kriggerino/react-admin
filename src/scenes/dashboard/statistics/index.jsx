import React, { useEffect } from "react";
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

const salesData = [
  {
    stats: "Placeholder",
    title: "Network",
  },
  {
    stats: "Placeholder",
    title: "VOS",
  },
  {
    stats: "Placeholder",
    title: "Hardware",
  },
  {
    stats: "Placeholder",
    title: "Khác",
  },
];

const renderStats = () => {
  return salesData.map((item, index) => (
    <Grid container xs={12} sm={3} key={index} >
      <Grid item key={index} sx={{ alignItems: "center" }}>
        <Box sx={{ width: "100%" }}>
          <Typography variant="h4" sx={{pb: 1.5}} >{item.title}</Typography>
          <Typography variant="h3" >{item.stats}</Typography>
        </Box>
      </Grid>
    </Grid>
  ));
};

const StatisticsCard = () => {

  useEffect(() => {
    axios.get("https://node-service-ihr4.onrender.com/getStats")
    .then((res) => {

    })
    .catch((err) => console.log(err));
  }, [])

  return (
    <Card sx={{ height: "100%"}}>
      <CardHeader
        title="Chi tiết số lượng "
        action={
          <IconButton
            size="small"
            aria-label="settings"
            className="card-more-options"
            sx={{ color: "text.secondary" }}
          >
          </IconButton>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: "2rem !important",
            letterSpacing: "0.15px !important",
          },
        }}
      />
      <CardContent >
        <Grid container spacing={[3, 0]} >
          {renderStats()}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StatisticsCard
