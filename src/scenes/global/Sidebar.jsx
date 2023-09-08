import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, Collapse } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import image from "../../assets/oil-spill.png";
import "react-pro-sidebar/dist/css/styles.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SecurityIcon from "@mui/icons-material/Security";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import EmailIcon from "@mui/icons-material/Email";
import axios from "axios";
const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: `#e0e0e0`,
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography variant="h5">{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const SubItem = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: `#e0e0e0`,
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = (props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .get(" https://node-service-ihr4.onrender.com/logout")
      .then((res) => {
        localStorage.clear();
        navigate("/");
        props.setIsLoggedIn(false);
        props.setUserdata({
          id: "",
          username: "",
          access: "",
        });
        props.setPermission({
          access_name: "",
          user_create: false,
          user_read: false,
          user_write: false,
          warning_create: false,
          warning_read: false,
          warning_write: false,
          permission_create: false,
          permission_read: false,
          permission_write: false,
        });
      })
      .catch((err) => console.log(err));
  };

  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsCollapsed(true);
    }
  };

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });
  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `#1F2A40 !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar width={"250px"} collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 10px 0",
              color: `#e0e0e0`,
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <img
                  alt="logo"
                  width="50px"
                  height="50px"
                  src={image}
                  style={{ cursor: "pointer" }}
                />
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon style={{ color: `#e0e0e0` }} />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={`#e0e0e0`}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0", pb: 2 }}
                >
                  {props.username}
                </Typography>
                <Typography variant="h5" color={"#4cceac"}>
                  {props.access}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={"#a3a3a3"}
              sx={{ m: "15px 0 5px 10px" }}
            >
              Data
            </Typography>
            {props.permission.access_name === "admin" && (
              <Item
                title="Manage User"
                to="/user"
                icon={<PeopleOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {props.permission.access_name !== "admin" && (
              <Item
                title="User Profile"
                to="/profile"
                icon={<PeopleOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            <Box sx={{ display: "flex" }}>
              <Item
                title={isCollapsed ? "" : "Warning"}
                to="/warning"
                icon={<ReceiptOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <IconButton onClick={handleChange}>
                <KeyboardArrowDownIcon style={{ color: `#e0e0e0` }} />
              </IconButton>
            </Box>
            <Collapse in={checked}>
              <SubItem
                title="VOS"
                to=""
                icon={<GppMaybeIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <SubItem
                title="Hardware"
                to=""
                icon={<GppMaybeIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Collapse>
            {props.permission.access_name === "admin" && (
              <Item
                title="Permissions"
                to="/permission"
                icon={<SecurityIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            <Typography
              variant="h6"
              color={"#a3a3a3"}
              sx={{ m: "15px 0 5px 10px" }}
            >
              Pages
            </Typography>
            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Email"
              to="/mailing"
              icon={<EmailIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <MenuItem
              style={{
                color: `#e0e0e0`,
              }}
              onClick={handleLogout}
              icon={<ExitToAppIcon />}
            >
              <Typography variant="h5">Logout</Typography>
            </MenuItem>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
