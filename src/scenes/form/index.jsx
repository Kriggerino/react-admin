import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const Form = ({ permission, handleClose, setTableUpdate }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const [permDDList, setPermDDList] = useState([]);
  const handleFormSubmit = (values) => {
    axios
      .post("https://node-service-ihr4.onrender.com/signup", values)
      .then((res) => {
        console.log(res);
        handleClose();
        setTableUpdate(true);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (permission.user_create !== 1) {
      navigate("/denyaccess");
    } else {
      axios.get("https://node-service-ihr4.onrender.com/getPermDDList").then((res) => {
        //const resultArray = res.data.Result.map((obj) => obj.access_name);
        setPermDDList(res.data.Result);
        console.log(permDDList);
      });
    }
  }, []);

  return (
    <Box m="20px">
      <Header title="Tạo mới người dùng" subtitle="Create a New User Profile" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Tên người dùng"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.username}
                name="username"
                error={!!touched.username && !!errors.username}
                helperText={touched.username && errors.username}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Họ thật"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Tên thật"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Liên lạc"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Địa chỉ"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                sx={{ gridColumn: "span 4" }}
              />
              <Box>
              <label htmlFor="email">
                Quyền truy cập
              </label>
              <select
                fullWidth
                variant="filled"
                type="text"
                label="Quyền truy cập"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.access}
                name="access"
                error={!!touched.access && !!errors.access}
                helperText={touched.access && errors.access}
                sx={{ gridColumn: "span 4" }}
              >
                {permDDList.map(({ access_name }) => (
                  <option key={access_name} value={access_name}>
                    {access_name}
                  </option>
                ))}
              </select>
              </Box>
            </Box>
            <Box display="flex" justifyContent="space-between" mt="20px">
              <Button
                onClick={handleSubmit}
                type="submit"
                color="secondary"
                variant="contained"
                sx={{ p: 1 }}
              >
                Tạo người dùng mới
              </Button>
              <Button
                onClick={handleClose}
                color="secondary"
                variant="contained"
                sx={{ p: 1 }}
              >
                Đóng
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  access: yup.string().required("required"),
});
const initialValues = {
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  contact: "",
  address: "",
  access: "",
};

export default Form;
