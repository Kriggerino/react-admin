import React from "react";
// ** MUI Imports
import Card from "@mui/material/Card";
import { useTheme } from "@mui/material/styles";
import CardContent from "@mui/material/CardContent";
// ** Custom Components Imports
import Chart from "react-apexcharts";
const PieChart = ({ errorCount }) => {
  const theme = useTheme();
  const chart_data = {
    series: [
      errorCount.VOSCount,
      errorCount.NetworkCount,
      errorCount.HardwareCount,
    ],
    options: {
      labels: ["VOS", "Network", "Hardware"],
      chart: {
        type: "donut",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };
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
        <Chart
          options={chart_data.options}
          series={chart_data.series}
          type="donut"
        />
      </CardContent>
    </Card>
  );
};

export default PieChart;
