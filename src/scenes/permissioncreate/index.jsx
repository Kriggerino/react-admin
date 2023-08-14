import {
  Box,
  Checkbox,
  Typography,
  Button,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import Header from "../../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PermCreate = ({handleClose, setTableUpdate}) => {
  const [newPermission, setNewPermission] = useState({
    access_name: "Quyền mới",
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
  const navigate = useNavigate();
  const submitPerm = () => {
    console.log(newPermission);
    axios
      .post(" https://node-service-ihr4.onrender.com/newPermission", newPermission)
      .then((res) => {
        console.log(res);
        handleClose();
        setTableUpdate(true);
      })
      .catch((err) => console.log(err));
  };
  return (
    <Box sx={{ width: "100%", justifyContent: "center", display: "flex" }}>
      <Box sx={{ p: 1, mt: 2, width: "100%" }}>
        <TextField
          variant="filled"
          type="text"
          label="Tên quyền"
          value={newPermission.access_name}
          onChange={(e) =>
            setNewPermission({ ...newPermission, access_name: e.target.value })
          }
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
              checked={newPermission.user_read}
              onChange={(e) => {
                setNewPermission({
                  ...newPermission,
                  user_read: e.target.checked,
                });
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Thay đổi thông tin"
              checked={newPermission.user_write}
              onChange={(e) => {
                setNewPermission({
                  ...newPermission,
                  user_write: e.target.checked,
                });
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Tạo mới"
              checked={newPermission.user_create}
              onChange={(e) => {
                setNewPermission({
                  ...newPermission,
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
              checked={newPermission.warning_read}
              onChange={(e) => {
                setNewPermission({
                  ...newPermission,
                  warning_read: e.target.checked,
                });
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Thay đổi thông tin"
              checked={newPermission.warning_write}
              onChange={(e) => {
                setNewPermission({
                  ...newPermission,
                  warning_write: e.target.checked,
                });
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Tạo mới"
              checked={newPermission.warning_create}
              onChange={(e) => {
                setNewPermission({
                  ...newPermission,
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
              checked={newPermission.permission_read}
              onChange={(e) => {
                setNewPermission({
                  ...newPermission,
                  permission_read: e.target.checked,
                });
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Thay đổi thông tin"
              checked={newPermission.permission_write}
              onChange={(e) => {
                setNewPermission({
                  ...newPermission,
                  permission_write: e.target.checked,
                });
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Tạo mới"
              checked={newPermission.permission_create}
              onChange={(e) => {
                setNewPermission({
                  ...newPermission,
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
          <Button color="secondary" variant="contained" onClick={submitPerm}>
            Thêm
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PermCreate;
