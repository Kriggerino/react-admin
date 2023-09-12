import React, { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";

import axios from "axios";
const UserEdit = ({ access, id, handleClose }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
    contact: "",
    access: "",
  });

  useEffect(() => {
    if (!(access === "admin")) {
      navigate("/denyaccess");
    } else {
      axios
        .get(" https://node-service-ihr4.onrender.com/get/" + id)
        .then((res) => {
          setData({
            ...data,
            username: res.data.Result[0].username,
            email: res.data.Result[0].email,
            address: res.data.Result[0].address,
            password: "",
            contact: res.data.Result[0].phone,
            access: res.data.Result[0].access,
          });
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(" https://node-service-ihr4.onrender.com/update/" + id, data)
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log("Data edited");
          navigate("/user");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <Box m="20px">
      <form onSubmit={handleSubmit}>
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
            sx={{ gridColumn: "span 2" }}
            onChange={(e) => setData({ ...data, username: e.target.value })}
            value={data.username}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Email"
            sx={{ gridColumn: "span 2" }}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            value={data.email}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Địa chỉ"
            sx={{ gridColumn: "span 2" }}
            onChange={(e) => setData({ ...data, address: e.target.value })}
            value={data.address}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Liên lạc"
            sx={{ gridColumn: "span 2" }}
            onChange={(e) => setData({ ...data, contact: e.target.value })}
            value={data.contact}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Mật khẩu"
            sx={{ gridColumn: "span 2" }}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            value={data.password}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Quyền truy cập"
            sx={{ gridColumn: "span 2" }}
            onChange={(e) => setData({ ...data, access: e.target.value })}
            value={data.access}
          />
        </Box>
        <Box display="flex" justifyContent="flex-end" mt="20px" gap="20px">
          <Button type="submit" color="secondary" variant="contained">
            Cập nhật
          </Button>
          <Button color="secondary" variant="contained" onClick={handleClose}>
            Đóng
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default UserEdit;
