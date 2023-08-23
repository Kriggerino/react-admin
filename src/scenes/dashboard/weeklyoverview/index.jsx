// ** MUI Imports
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import CardContent from "@mui/material/CardContent";

// // ** Icons Imports
// import DotsVertical from 'mdi-material-ui/DotsVertical'

// ** Custom Components Imports
import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
import axios from "axios";

const WeeklyOverview = ({ errorCount }) => {
  // ** Hook
  const theme = useTheme();
  

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
    },
    dataLabels: { enabled: true },
    legend: { show: true },
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    xaxis: {
      categories: ["VOS", "Network", "Hardware"],
      tickPlacement: 'on',
      labels: { show: true },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
  };

  return (
    <Card sx={{ height: "100%" }}>
      {/* <CardHeader
        title='Weekly Overview'
        titleTypographyProps={{
          sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' }
        }}
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
      /> */}
      <CardContent
        sx={{ "& .apexcharts-xcrosshairs.apexcharts-active": { opacity: 0 }, height: "100%", justifyContent: "space-between", display: "flex", flexDirection: "column" }}
      >
        <Chart
          type="bar"
          height={265}
          options={options}
          series={[
            {
              data: [
                errorCount.VOSCount,
                errorCount.NetworkCount,
                errorCount.HardwareCount,
              ],
            },
          ]}
        />
        <Button fullWidth variant="contained">
          Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default WeeklyOverview;
