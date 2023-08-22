import React from "react";
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
    title: "Khẩn cấp",
  },
  {
    stats: "Placeholder",
    title: "Trung bình",
  },
  {
    stats: "Placeholder",
    title: "Nhẹ ",
  },
];

const renderStats = () => {
  return salesData.map((item, index) => (
    <Grid item xs={12} sm={3} key={index}>
      <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h4">{item.title}</Typography>
          <Typography variant="h3">{item.stats}</Typography>
        </Box>
      </Box>
    </Grid>
  ));
};

const StatisticsCard = () => {
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
        subheader={
          <Typography variant="body2">
            Subheader nghiêm trọng
          </Typography>
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
