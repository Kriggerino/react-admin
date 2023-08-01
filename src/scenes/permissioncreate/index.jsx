import { Box, Checkbox, Typography } from "@mui/material";
import React from "react";
import Header from "../../components/Header";
const PermCreate = () => {
  return (
    <Box>
      <Header title="Tạo quyền" />

      <form>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
            <Box>

            </Box>
        </Box>
      </form>
    </Box>
  );
};

export default PermCreate;
