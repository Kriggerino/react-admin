import React from "react";
//Mui Import
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import CardContent from "@mui/material/CardContent";

//Custom Component
import Chart from "react-apexcharts";
import axios from "axios";



const series = [
  {
    name: "TEAM A",
    type: "column",
    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
  },
  {
    name: "TEAM A2",
    type: "column",
    data: [24, 25, 16, 24, 23, 12, 38, 42, 22, 40, 30],
  },
  {
    name: "TEAM B",
    type: "column",
    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
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
    width: [0, 2, 2],
    curve: "smooth",
  },
  plotOptions: {
    bar: {
      columnWidth: "50%",
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
  labels: [
    "01/01/2003",
    "02/01/2003",
    "03/01/2003",
    "04/01/2003",
    "05/01/2003",
    "06/01/2003",
    "07/01/2003",
    "08/01/2003",
    "09/01/2003",
    "10/01/2003",
    "11/01/2003",
  ],
  markers: {
    size: 0,
  },
  xaxis: {
    type: "datetime",
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

const BigTable = ({dailyTest}) => {

  

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent
        sx={{
          "& .apexcharts-xcrosshairs.apexcharts-active": { opacity: 0 },
          height: "100%",
          justifyContent: "space-between",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Chart height={360} options={options} series={series} />
        <Button fullWidth variant="contained" onClick={dailyTest}>
          Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default BigTable;
