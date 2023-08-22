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
import StatisticsCards from "./statistics";
import WeeklyOverview from "./weeklyoverview";
import DeadLine from "./deadline";
import Total from "./total";
const Dashboard = ({ setIsLoggedIn, handleUserData, permission }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const navigate = useNavigate();
  useEffect(() => {
    if (permission) {
      setIsLoggedIn(true);
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
        <Grid item xs={12} md={4}>
          <Total/>
        </Grid>
        {/* Short Stats */}
        <Grid item xs={12} md={8}>
          <StatisticsCards />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <WeeklyOverview />
        </Grid>
        <Grid item xs={12} md={8}>
          <DeadLine/>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Grid container spacing={6}>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}></Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} lg={4}></Grid>
        <Grid item xs={12} md={12} lg={8}></Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
