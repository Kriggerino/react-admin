import React from "react";
import AtomicSpinner from "atomic-spinner";
import { Typography, Box } from "@mui/material";
const LoadingPage = () => {
  return (
    <Box sx={{ justifyContent: "center", mx: "auto", my: "auto" }}>
      <AtomicSpinner />
      <Typography variant="h2" color={`#e0e0e0`} sx={{ justifyContent: "center", mx: "auto" }}>
        Loading...
      </Typography>
    </Box>
  );
};

export default LoadingPage;
