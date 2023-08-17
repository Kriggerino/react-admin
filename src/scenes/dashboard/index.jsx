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
    <Box ml="20px">
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
          <Card>
            <CardContent>
              <Typography variant="h4">Congratulations John! 🥳</Typography>
              <Typography variant="body2" sx={{ letterSpacing: "0.25px" }}>
                Best seller of the month
              </Typography>
              <Typography variant="h4" sx={{ my: 4, color: "primary.main" }}>
                $42.8k
              </Typography>
              <Button size="small" variant="contained">
                View Sales
              </Button>
            </CardContent>
          </Card>
        </Grid>
        {/* Short Stats */}
        <Grid item xs={12} md={8}>
          <StatisticsCards />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <WeeklyOverview />
        </Grid>
        <Grid item xs={12} md={6} lg={4}></Grid>
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
