import { Box, Button, MenuItem, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const Form = ({ permission, handleClose, setTableUpdate }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const [permDDList, setPermDDList] = useState([]);
  const [valid, setValid] = useState(false);
  const [values, setValues] = useState({
    username: "",
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
        handleClose();
        setTableUpdate(true);
      })
      .catch((err) => console.log(err));
  };

  //Minimum eight characters, at least one letter and one number:
  const handleValid = (e) => {
    const reg = new RegExp("/^(?=.*[A-Za-z])(?=.*)[A-Za-z]{8,}$/");
    setValid(reg.test(e.target.value));
    setValues({ ...values, password: e.target.value });
  };

  useEffect(() => {
    if (permission.user_create !== 1) {
      navigate("/denyaccess");
    } else {
      axios
        .get("https://node-service-ihr4.onrender.com/getPermDDList")
        .then((res) => {
          //const resultArray = res.data.Result.map((obj) => obj.access_name);
          setPermDDList(res.data.Result);
        });
    }
  }, []);

  return (
    <Box m="20px">
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
            required={true}
            name="username"
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Email"
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            value={values.email}
            name="email"
            required={true}
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="password"
            label="Password"
            onChange={(e) => handleValid(e)}
            value={values.password}
            name="password"
            error={!valid}
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

          <TextField
            fullWidth
            select
            variant="filled"
            type="text"
            label="Quyền truy cập"
            onChange={(e) => setValues({ ...values, access: e.target.value })}
            value={values.access}
            required={true}
            name="access"
            sx={{ gridColumn: "span 4" }}
          >
            {permDDList.map(({ access_name }) => (
              <MenuItem key={access_name} value={access_name}>
                {access_name}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box display="flex" justifyContent="space-between" mt="20px">
          <Button
            onClick={handleFormSubmit}
            type="button"
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

// const checkoutSchema = yup.object().shape({
//   firstName: yup.string().required("required"),
//   lastName: yup.string().required("required"),
//   email: yup.string().email("invalid email").required("required"),
//   access: yup.string().required("required"),
// });
// const initialValues = {
//   username: "",
//   firstName: "",
//   lastName: "",
//   email: "",
//   password: "",
//   contact: "",
//   address: "",
//   access: "",
// };

export default Form;
