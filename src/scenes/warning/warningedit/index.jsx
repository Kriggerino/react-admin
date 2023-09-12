import React, { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, Button, TextField, MenuItem } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const WarningEdit = ({ permission, id, handleEditClose }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const [data, setData] = useState({
    message: "",
    message_type: "",
    contact: "",
    status: "",
    system: "",
  });

  useEffect(() => {
    if (!(permission.warning_write === 1)) {
      navigate("/denyaccess");
    } else {
      axios
        .get(" https://node-service-ihr4.onrender.com/getWarningEdit/" + id)
        .then((res) => {
          setData({
            ...data,
            message: res.data.Result[0].message,
            message_type: res.data.Result[0].message_type,
            contact: res.data.Result[0].contact,
            status: res.data.Result[0].status,
            system: res.data.Result[0].system_id,
          });
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(" https://node-service-ihr4.onrender.com/updateWarning/" + id, data)
      .then((res) => {
        if (res.data.Status === "success") {
          alert("Thay đổi thành công");
          handleEditClose();
        }
      })
      .catch((err) => console.log(err));
  };
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
            label="Tên cảnh báo"
            value={data.message}
            onChange={(e) => setData({ ...data, message: e.target.value })}
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            select
            label="Mức độ"
            sx={{ gridColumn: "span 2" }}
            value={data.message_type}
            onChange={(e) => setData({ ...data, message_type: e.target.value })}
          >
            <MenuItem value={1}>Khẩn cấp</MenuItem>
            <MenuItem value={2}>Trung bình</MenuItem>
            <MenuItem value={3}>Nhẹ</MenuItem>
          </TextField>
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Liên lạc"
            value={data.contact}
            onChange={(e) => setData({ ...data, contact: e.target.value })}
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            select
            label="Trạng thái"
            sx={{ gridColumn: "span 2" }}
            value={data.status}
            onChange={(e) => setData({ ...data, status: e.target.value })}
          >
            <MenuItem value={0}>Chờ xử lý</MenuItem>
            <MenuItem value={1}>Đã xử lý</MenuItem>
          </TextField>
          <TextField
            fullWidth
            variant="filled"
            select
            label="Hệ thống"
            sx={{ gridColumn: "span 2" }}
            value={data.system}
            onChange={(e) => setData({ ...data, system: e.target.value })}
          >
            <MenuItem value={1}>VO Service</MenuItem>
            <MenuItem value={2}>Hardware</MenuItem>
            <MenuItem value={3}>Network</MenuItem>
          </TextField>
        </Box>
        <Box display="flex" justifyContent="flex-end" gap="30px" mt="30px">
          <Button
            type="submit"
            onClick={handleSubmit}
            color="secondary"
            variant="contained"
          >
            Cập nhật
          </Button>
          <Button
            onClick={handleEditClose}
            color="secondary"
            variant="contained"
          >
            Đóng
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default WarningEdit;
