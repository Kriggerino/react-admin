import React from "react";
// ** MUI Imports
import Card from "@mui/material/Card";
import { useTheme } from "@mui/material/styles";
import CardContent from "@mui/material/CardContent";
// ** Custom Components Imports
import Chart from "react-apexcharts";

const Urgent = ({ alertData }) => {
  const chart_data = {
    series: [
      {
        data: [alertData.KCCount, alertData.TBCount, alertData.NCount],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: true,
        position: 'top',
      },
      xaxis: {
        categories: [
          "Khẩn cấp",
          "Trung bình",
          "Nhẹ",
        ],
      },
    },
  };
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Chart
          options={chart_data.options}
          series={chart_data.series}
          type="bar"
        />
      </CardContent>
    </Card>
  );
};

export default Urgent;
