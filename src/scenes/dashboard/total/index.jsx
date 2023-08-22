import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardHeader , CardContent, Typography } from "@mui/material";
const Total = () => {
  const [data, setData] = useState({
    totalCount: 0,
  });
  useEffect(() => {
    axios
      .get("https://node-service-ihr4.onrender.com/getCount")
      .then((res) => {
        setData({ ...data, totalCount: res.data.count[0].sl });
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Card sx={{ height: "100%", alignContent: "center" }}>
      <CardHeader
        title="Tổng số cảnh báo"
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: "2rem !important",
            letterSpacing: "0.15px !important",
          },
        }}
      />
      <CardContent sx={{ pt: (theme) => `${theme.spacing(3)} !important` }}>
        <Typography variant="h1" sx={{ color: "primary.main" }}>
          {data.totalCount}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Total;
