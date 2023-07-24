import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb="30px" sx={{display:"flex" ,ml:"auto", mr: "auto"}}>
      <Typography
        variant="h3"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ ml:"auto", mr: "auto" }}
      >
        {title}
      </Typography>
      {/* <Typography variant="h5" color={colors.greenAccent[400]}>
        {subtitle}
      </Typography> */}
    </Box>
  );
};

export default Header;