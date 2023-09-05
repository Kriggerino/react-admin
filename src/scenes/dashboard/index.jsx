import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  Card,
  CardContent,
} from "@mui/material";
import { tokens } from "../../theme";
import Grid from "@mui/material/Grid";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeadLine from "./deadline";
import BigTable from "./bigtable";
import PieChart from "./pie";
import Urgent from "./urgent";
import TotalWarning from "./smallcards/totalwarning";
import TotalUser from "./smallcards/totalusers";
import UserUpdate from "./update";
const Dashboard = ({
  setIsLoggedIn,
  handleUserData,
  permission,
  isLoggedIn,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const colors = tokens(theme.palette.mode);
  //Props for components
  const [errorCount, setErrorCount] = useState({
    VOSCount: 0,
    NetworkCount: 0,
    HardwareCount: 0,
  });
  const [alertData, setAlertData] = useState({
    KCCount: 0,
    TBCount: 0,
    NCount: 0,
  });

  useEffect(() => {
    if (permission) {
      setIsLoggedIn(true);
      axios
        .get("https://node-service-ihr4.onrender.com/getStats")
        .then((res) => {
          setErrorCount({
            ...errorCount,
            VOSCount: res.data.Result[0].VOSCount,
            HardwareCount: res.data.Result[1].HardwareCount,
            NetworkCount: res.data.Result[2].NetworkCount,
          });
          console.log(errorCount);
        })
        .catch((err) => console.log(err));
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
    } else {
      navigate("/");
    }
  }, []);

  return (
    <Box ml="20px" mr="15px">
      {/* HEADER */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      ></Box>
      {/* GRID & CHARTS */}

      <Grid container spacing={4}>
        {/* Congrats */}

        {/* Short Stats */}
        <Grid item xs={12} sx={{ display: "flex", flexDirection: "row" }}>
          <Grid container spacing={6}>
            <Grid item md={6} xs={6}>
              <TotalWarning />
            </Grid>
            <Grid item md={6} xs={6}>
              <TotalUser />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", flexDirection: "row" }}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6} lg={4}>
              <Urgent alertData={alertData} />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <PieChart errorCount={errorCount} />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <UserUpdate />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={12} lg={12}>
          <BigTable />
        </Grid>
        <Grid item xs={12} md={6} lg={4}></Grid>
        {/* <Grid item xs={12} md={6} lg={4}>
          <Grid container spacing={6}>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}></Grid>
          </Grid>
        </Grid> */}
        <Grid item xs={12} md={12}>
          <DeadLine />
        </Grid>
        <Grid item xs={12} md={12} lg={8}></Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
