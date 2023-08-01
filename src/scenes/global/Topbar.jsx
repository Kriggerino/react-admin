import { Box, IconButton, MenuItem, Tooltip, useTheme } from "@mui/material";
import Menu from "@mui/material/Menu";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ColorModeContext, tokens } from "../../theme";
import useMediaQuery from '@mui/material/useMediaQuery'
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { styled } from "@mui/material/styles";
import axios from "axios";
import PerfectScrollbarComponent from "react-perfect-scrollbar";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const styles = {
  maxHeight: 300,
  "& .MuiMenuItem-root:last-of-type": {
    border: 0,
  },
};

const DDMenu = styled(Menu)(({ theme }) => ({
  "& .MuiMenu-paper": {
    width: 380,
    overflow: "hidden",
    fontSize: "12px",
    marginTop: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  "& .MuiMenu-list": {
    padding: 0,
  },
}));

const DDItem = styled(MenuItem)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const MenuItemTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  flex: "1 1 100%",
  overflow: "hidden",
  fontSize: "0.875rem",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  marginBottom: theme.spacing(0.75),
}));

// ** Styled component for the subtitle in MenuItems
const MenuItemSubtitle = styled(Typography)({
  flex: "1 1 100%",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
});

const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  ...styles,
});

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const hidden = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  const ScrollWrapper = ({ children }) => {
    if (hidden) {
      return (
        <Box sx={{ ...styles, overflowY: "auto", overflowX: "hidden" }}>
          {children}
        </Box>
      );
    } else {
      return (
        <PerfectScrollbar
          options={{ wheelPropagation: false, suppressScrollX: true }}
        >
          {children}
        </PerfectScrollbar>
      );
    }
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleDropdownOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };
  const navDashboard = () => {
    navigate("/dashboard");
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    axios
      .get("https://node-service-ihr4.onrender.com /logout")
      .then((res) => {
        localStorage.clear();
        navigate("/");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* ICONS */}
      <Box display="flex" marginLeft="auto" marginRight="0">
        {/* <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton> */}
        <IconButton onClick={handleDropdownOpen}>
          <NotificationsOutlinedIcon />
        </IconButton>
        <DDMenu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleDropdownClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <DDItem disableRipple>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography sx={{ fontWeight: 300 }}>Notifications</Typography>
              <Chip
                size="small"
                label="8 New"
                color="primary"
                sx={{
                  height: 20,
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  borderRadius: "10px",
                }}
              />
            </Box>
          </DDItem>
          <ScrollWrapper>
            <DDItem onClick={handleDropdownClose}>
              <Box
                sx={{ width: "100%", display: "flex", alignItems: "center" }}
              >
                <Box
                  sx={{
                    mx: 4,
                    flex: "1 1",
                    display: "flex",
                    overflow: "hidden",
                    flexDirection: "column",
                  }}
                >
                  <MenuItemTitle>New user registered.</MenuItemTitle>
                  <MenuItemSubtitle variant="body2">
                    5 hours ago
                  </MenuItemSubtitle>
                </Box>
                <Typography variant="caption" sx={{ color: "text.disabled" }}>
                  Yesterday
                </Typography>
              </Box>
            </DDItem>
            <DDItem onClick={handleDropdownClose}>
              <Box
                sx={{ width: "100%", display: "flex", alignItems: "center" }}
              >
                <Box
                  sx={{
                    mx: 4,
                    flex: "1 1",
                    display: "flex",
                    overflow: "hidden",
                    flexDirection: "column",
                  }}
                >
                  <MenuItemTitle>New message received 👋🏻</MenuItemTitle>
                  <MenuItemSubtitle variant="body2">
                    You have 10 unread messages
                  </MenuItemSubtitle>
                </Box>
                <Typography variant="caption" sx={{ color: "text.disabled" }}>
                  11 Aug
                </Typography>
              </Box>
            </DDItem>
            <DDItem onClick={handleDropdownClose}>
              <Box
                sx={{ width: "100%", display: "flex", alignItems: "center" }}
              >
                <Box
                  sx={{
                    mx: 4,
                    flex: "1 1",
                    display: "flex",
                    overflow: "hidden",
                    flexDirection: "column",
                  }}
                >
                  <MenuItemTitle>Paypal</MenuItemTitle>
                  <MenuItemSubtitle variant="body2">
                    Received Payment
                  </MenuItemSubtitle>
                </Box>
                <Typography variant="caption" sx={{ color: "text.disabled" }}>
                  25 May
                </Typography>
              </Box>
            </DDItem>
          </ScrollWrapper>
        </DDMenu>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Profile">
            <IconButton onClick={handleOpenUserMenu}>
              <PersonOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem key="profile" onClick={handleCloseUserMenu}>
              <Typography textAlign="center">Profile</Typography>
            </MenuItem>
            <MenuItem key="account" onClick={handleCloseUserMenu}>
              <Typography textAlign="center">Account</Typography>
            </MenuItem>
            <MenuItem
              key="dashboard"
              onClick={() => {
                handleCloseUserMenu();
                navDashboard();
              }}
            >
              <Typography textAlign="center">Dashboard</Typography>
            </MenuItem>
            <MenuItem
              key="logout"
              onClick={() => {
                handleCloseUserMenu();
                handleLogout();
              }}
            >
              <Typography textAlign="center">Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
};

export default Topbar;
