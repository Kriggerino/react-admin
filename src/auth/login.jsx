import { Box, Typography, useTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Avatar from "@mui/material/Avatar";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { tokens } from "../theme";
import splash from "../assets/login_splash.jpg";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
//Backend
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
//Formik
import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect } from "react";

const Login = () => {
  //Stylings
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const textFieldStyle = {
    "& label.Mui-focused": {
      color: "green",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "green",
      },
    },
  };
  const navigate = useNavigate();

  //Email regex from https://regexr.com/3e48o
  // const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  // const basicSchema = yup.object().shape({
  //   email: yup
  //     .string()
  //     .email("Please enter a valid email")
  //     .matches(emailRegex, {message: "Invalid email"})
  //     .required("Required"),
  //   password: yup
  //     .string()
  //     .min(8)
  //     .matches(passwordRegex, { message: "Please create stronger password" })
  //     .required("Required"),
  // });

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      navigate("/dashboard");
    }
  }, []);

  const onSubmit = (values, actions) => {
    axios
      .post(" https://node-service-ihr4.onrender.com/login", values)
      .then(async (res) => {
        if (res.data.valid) {
          actions.resetForm();
          await localStorage.setItem("token", res.data.token);
          await navigate("/dashboard");
        } else {
          alert("Thông tin đăng nhập không chính xác");
        }
      })
      .catch((err) => console.log(err));
  };
  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validateOnBlur: true,
    validateOnChange: true,
    onSubmit,
  });
  //onSubmit

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <Box noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              sx={textFieldStyle}
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              sx={textFieldStyle}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default Login;
