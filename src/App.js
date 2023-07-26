import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import User from "./scenes/user";
import Warning from "./scenes/warning";
import Bar from "./scenes/bar";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Login from "./auth/login.jsx";
import "./index.css";
import UserEdit from "./scenes/useredit";
import WarningEdit from "./scenes/warningedit";
import DenyAccess from "./scenes/denyaccess";
function App() {
  const navigate = useNavigate();
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userdata, setUserdata] = useState({
    id: "",
    username: "",
    access: "",
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
      .get("http://localhost:8001/authcheck", {
        headers: {
          "access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.valid) {
          setIsLoggedIn(true);
          console.log(res.data.result);
          handleUserData(res.data.result);
        } else {
          navigate("/");
        }
      });

    if (localStorage.getItem("token") === null) {
      setIsLoggedIn(false);
      navigate("/");
    }
  }, []);

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
              setIsLoggedIn={setIsLoggedIn}
            />
          )}
          <main className="content">
            {isLoggedIn && <Topbar />}
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/pages/login" element={<Login />} />
              <Route
                path="/dashboard"
                element={
                  <Dashboard
                    setIsLoggedIn={setIsLoggedIn}
                    handleUserData={handleUserData}
                  />
                }
              />
              <Route path="/user" element={<User access={userdata.access} />} />
              <Route
                path="/user/userEdit/:id"
                element={<UserEdit access={userdata.access} />}
              />
              <Route
                path="/warning"
                element={
                  <Warning userid={userdata.id} access={userdata.access} />
                }
              />
              <Route
                path="/warning/warningEdit/:id"
                element={<WarningEdit access={userdata.access} />}
              />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/denyaccess" element={<DenyAccess />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
