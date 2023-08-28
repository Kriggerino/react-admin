import {
  Box,
  Checkbox,
  Typography,
  Button,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const PermEdit = ({permission, id}) => {
  const [data, setData] = useState({
    access_name: "",
    user_create: 0,
    user_read: 0,
    user_write: 0,
    warning_create: 0,
    warning_read: 0,
    warning_write: 0,
    permission_create: 0,
    permission_read: 0,
    permission_write: 0,
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (!permission.permission_read) {
      navigate("/denyaccess");
    } else {
      axios
        .get("https://node-service-ihr4.onrender.com/getPermEdit" + id)
        .then((res) => {
          if (res.data.Status === "Success") {
            setData(res.data.Result[0]);
          } else {
            alert("Error");
          }
        })
        .catch((err) => console.log(err));
    }
  });
  return (
    <Box sx={{ width: "100%", justifyContent: "center", display: "flex" }}>
      <Box sx={{ p: 1, mt: 2, width: "100%" }}>
        <TextField
          variant="filled"
          type="text"
          label="Tên quyền"
          value={data.access_name}
          onChange={(e) => setData({ ...data, access_name: e.target.value })}
          sx={{ width: "100%" }}
        />
        <Typography variant="h6" sx={{ pt: 2 }}>
          Người dùng
        </Typography>
        <Box display="flex">
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="Đọc"
              checked={data.user_read}
              onChange={(e) => {
                setData({
                  ...data,
                  user_read: e.target.checked,
                });
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Thay đổi thông tin"
              checked={data.user_write}
              onChange={(e) => {
                setData({
                  ...data,
                  user_write: e.target.checked,
                });
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Tạo mới"
              checked={data.user_create}
              onChange={(e) => {
                setData({
                  ...data,
                  user_create: e.target.checked,
                });
              }}
            />
          </FormGroup>
        </Box>
        <Typography variant="h6">Cảnh báo</Typography>
        <Box display="flex">
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="Đọc"
              checked={data.warning_read}
              onChange={(e) => {
                setData({
                  ...data,
                  warning_read: e.target.checked,
                });
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Thay đổi thông tin"
              checked={data.warning_write}
              onChange={(e) => {
                setData({
                  ...data,
                  warning_write: e.target.checked,
                });
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Tạo mới"
              checked={data.warning_create}
              onChange={(e) => {
                setData({
                  ...data,
                  warning_create: e.target.checked,
                });
              }}
            />
          </FormGroup>
        </Box>
        <Typography variant="h6">Phân quyền</Typography>
        <Box display="flex">
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="Đọc"
              checked={data.permission_read}
              onChange={(e) => {
                setData({
                  ...data,
                  permission_read: e.target.checked,
                });
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Thay đổi thông tin"
              checked={data.permission_write}
              onChange={(e) => {
                setData({
                  ...data,
                  permission_write: e.target.checked,
                });
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Tạo mới"
              checked={data.permission_create}
              onChange={(e) => {
                setData({
                  ...data,
                  permission_create: e.target.checked,
                });
              }}
            />
          </FormGroup>
        </Box>
        <Box
          sx={{
            display: "flex",
            p: 1,
            justifyContent: "center",
          }}
        >
          <Button color="secondary" variant="contained">
            Cập nhật
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PermEdit;
