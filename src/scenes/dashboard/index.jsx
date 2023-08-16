import React, { useState, useEffect } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

import axios from "axios";
import { useNavigate } from "react-router-dom";
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
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
      </Box>
      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
      
      </Box>
    </Box>
  );
};

export default Dashboard;
