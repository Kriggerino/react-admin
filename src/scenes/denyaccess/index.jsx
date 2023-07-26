import React from "react";
// ** MUI Components
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
const BoxWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    width: "90vw",
  },
}));

const DenyAccess = () => {
  const navigate = useNavigate();
  const navDashboard = () => {
    navigate("/dashboard");
  };
  return (
    <Box className="content-center">
      <Box
        sx={{
          p: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <BoxWrapper sx={{ p:3 }}>
          <Typography variant="h1">401</Typography>
          <Typography
            variant="h5"
            sx={{ mb: 1, fontSize: "1.5rem !important" }}
          >
            Không đủ quyền
          </Typography>
          <Typography variant="body2">
            Người dùng không đủ quyền truy cập chức năng này. Xin liên lạc quản lý.
          </Typography>
        </BoxWrapper>
        <Button
          component="a"
          onClick={navDashboard}
          color="secondary"
          variant="contained"
          sx={{ px: 5.5 }}
        >
          Quay lại
        </Button>
      </Box>
    </Box>
  );
};

export default DenyAccess;
