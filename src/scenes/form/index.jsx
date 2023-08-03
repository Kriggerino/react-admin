import { Box, Button, TextField } from "@mui/material";

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
  const [values, setValues] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    contact: "",
    address: "",
    access: "",
  });

  const handleFormSubmit = () => {
    axios
      .post("https://node-service-ihr4.onrender.com/signup", values)
      .then((res) => {
        console.log(res);
        handleClose();
        setTableUpdate(true);
        console.log(permission);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("https://node-service-ihr4.onrender.com/getPermDDList")
      .then((res) => {
        //const resultArray = res.data.Result.map((obj) => obj.access_name);
        setPermDDList(res.data.Result);
        console.log(permDDList);
      });
  }, []);

  return (
    <Box m="20px">
      <Header title="Tạo mới người dùng" subtitle="Create a New User Profile" />

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
            onChange={(e) => setValues({ ...values, username: e.target.value })}
            value={values.username}
            name="username"
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Họ thật"
            onChange={(e) =>
              setValues({ ...values, firstName: e.target.value })
            }
            value={values.firstName}
            name="firstName"
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Tên thật"
            onChange={(e) => setValues({ ...values, lastName: e.target.value })}
            value={values.lastName}
            name="lastName"
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Email"
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            value={values.email}
            name="email"
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Password"
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            value={values.password}
            name="password"
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Liên lạc"
            onChange={(e) => setValues({ ...values, contact: e.target.value })}
            value={values.contact}
            name="contact"
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Địa chỉ"
            onChange={(e) => setValues({ ...values, address: e.target.value })}
            value={values.address}
            name="address"
            sx={{ gridColumn: "span 4" }}
          />
          <Box>
            <label htmlFor="email">Quyền truy cập</label>
            <select
              fullWidth
              variant="filled"
              type="text"
              label="Quyền truy cập"
              onChange={(e) => setValues({ ...values, access: e.target.value })}
              value={values.access}
              name="access"
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
            onClick={handleFormSubmit}
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
