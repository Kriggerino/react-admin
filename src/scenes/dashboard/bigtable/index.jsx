import React, { useEffect, useState } from "react";
//Mui Import
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import CardContent from "@mui/material/CardContent";

//Custom Component
import Chart from "react-apexcharts";
import axios from "axios";



const BigTable = () => {
  const [data, setData] = useState();
  useEffect(() => {
    axios
      .get("https://node-service-ihr4.onrender.com/dailychart")
      .then((res) => {
        setData(res.data.Result);
      });
  },[]);

  const series = [
    {
      name: "VOS",
      type: "column",
      data: data?.map(data => data.vosCount),
    },
    {
      name: "Hardware",
      type: "column",
      data: data?.map(data => data.hwCount),
    },
    {
      name: "Network",
      type: "column",
      data: data?.map(data => data.nwCount),
    },
  ];

  const options = {
    chart: {
      height: 350,
      type: "line",
      stacked: false,
      toolbar: { show: false },
    },
    stroke: {
      width: 2,
    },
    plotOptions: {
      bar: {
        columnWidth: "60%",
        barHeight: "70%",
      },
    },
  
    fill: {
      opacity: [0.85, 0.85, 0.85],
      gradient: {
        inverseColors: false,
        shade: "light",
        type: "vertical",
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [0, 100, 100, 100],
      },
    },
    labels: data?.map(data => data.date),
    markers: {
      size: 0,
    },
    xaxis: {
      type: "string",
    },
    yaxis: {
      title: {
        text: "Points",
      },
      min: 0,
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
  };

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent
        sx={{
          "& .apexcharts-xcrosshairs.apexcharts-active": { opacity: 0 },
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Chart height={360} options={options} series={series} />
        <Button
          fullWidth
          variant="contained"
        >
          Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default BigTable;
