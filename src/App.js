import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import User from "./scenes/user";
import Warning from "./scenes/warning";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Login from "./auth/login.jsx";
import "./index.css";
import DenyAccess from "./scenes/global/denyaccess";
import WarningDetails from "./scenes/warning/warningdetails";
import Permissions from "./scenes/permissions";
import LoadingPage from "./components/LoadingPage";
import VOS from "./scenes/warning/vos";
import Email from "./scenes/mail";
import UserProfile from "./scenes/user/profile";
function App() {
  const navigate = useNavigate();
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loadingState, setLoadingState] = useState(true);
  const [userdata, setUserdata] = useState({
    id: "",
    username: "",
    access: "",
  });

  const [permission, setPermission] = useState({
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

  const handleUserData = (data) => {
    setUserdata({
      ...data,
      id: data.id,
      username: data.username,
      access: data.access,
    });
  };

  useEffect(() => {
    axios
      .get("https://node-service-ihr4.onrender.com/authcheck", {
        headers: {
          "access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.valid) {
          setIsLoggedIn(true);
          handleUserData(res.data.Result);
          setPermission(res.data.Permission[0]);
          setLoadingState(false);
        } else {
          navigate("/");
          setLoadingState(false);
        }
      });

    if (localStorage.getItem("token") === null) {
      setIsLoggedIn(false);
      navigate("/");
    }
  }, [isLoggedIn]);
  if (loadingState) {
    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <div className="app">
            <LoadingPage />
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isLoggedIn && (
            <Sidebar
              isSidebar={isSidebar}
              username={userdata.username}
              access={userdata.access}
              permission={permission}
              setIsLoggedIn={setIsLoggedIn}
              setUserdata={setUserdata}
              setPermission={setPermission}
            />
          )}
          <main className="content">
            {isLoggedIn && <Topbar />}
            <Routes>
              <Route path="/" element={<Login />} />
              <Route
                path="/dashboard"
                element={
                  <Dashboard
                    setIsLoggedIn={setIsLoggedIn}
                    handleUserData={handleUserData}
                    permission={permission}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route
                path="/profile"
                element={<UserProfile id={userdata.id} />}
              />

              <Route
                path="/user"
                element={
                  <User permission={permission} access={userdata.access} />
                }
              />

              <Route
                path="/warning"
                element={
                  <Warning userid={userdata.id} permission={permission} />
                }
              />
              <Route
                path="/warning/VOS"
                element={<VOS permission={permission} />}
              />
              <Route
                path="/warning/warningDetails/:id"
                element={<WarningDetails permission={permission} />}
              />
              <Route
                path="/permission"
                element={<Permissions permission={permission} />}
              />
              <Route path="/denyaccess" element={<DenyAccess />} />
              <Route path="/mailing" element={<Email />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
