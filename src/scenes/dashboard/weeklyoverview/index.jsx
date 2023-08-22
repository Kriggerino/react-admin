// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

// // ** Icons Imports
// import DotsVertical from 'mdi-material-ui/DotsVertical'

// ** Custom Components Imports
import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
import axios from "axios";

const WeeklyOverview = () => {
  // ** Hook
  const theme = useTheme();
  const [errorCount, setErrorCount] = useState({
    VOSCount: 0,
    NetworkCount: 0,
    HardwareCount: 0,
  });
  useEffect(() => {
    axios.get("https://node-service-ihr4.onrender.com/getStats").then((res) => {
      setErrorCount({
        ...errorCount,
        VOSCount: res.data.Result[0].VOSCount,
        HardwareCount: res.data.Result[1].HardwareCount,
        NetworkCount: res.data.Result[2].NetworkCount,
      });
    })
    .catch((err) => console.log(err));
  }, []);

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
          height={205}
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
