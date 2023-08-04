import React from "react";
import AtomicSpinner from "atomic-spinner";
import { Typography, Box } from "@mui/material";
const LoadingPage = () => {
  return (
    <Box sx={{ justifyContent: "center", mx: "auto", my: "auto" }}>
      <AtomicSpinner />
      <Box sx={{display: "flex", justifyContent: "center", mx: "auto"}}>
        <Typography
          variant="h2"
          color={`#e0e0e0`}
          sx={{ pt: 3 }}
        >
          Loading...
        </Typography>
      </Box>
    </Box>
  );
};

export default LoadingPage;
