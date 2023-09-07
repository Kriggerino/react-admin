import { Box, Typography } from "@mui/material";
import React from "react";

const CustomNoRowsOverlay = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Typography variant="h3">Fetching data...</Typography>
    </Box>
  );
};

export default CustomNoRowsOverlay;
