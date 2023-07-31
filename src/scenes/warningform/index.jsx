import React, {useEffect, useState} from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { Box, Button, TextField, MenuItem } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const WarningForm = (props) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const [data, setData] = useState({
    message:'',
    message_type: 1,
    contact: '',
    status: 0,
    creatorid: props.userid,
  })
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(data);
    axios.post("https://node-service-ihr4.onrender.com/insertWarning", data)
    .then((res) =>{
      navigate("/warning");
    })
  };

  useEffect(() => {
    if (!(props.access === "admin")) {
      navigate("/denyaccess");
    }
  }, [])
  return (
    <Box m="20px">
      <Header title="Tạo cảnh báo" />

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
            onChange={(e) => setData({...data, message: e.target.value })}
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            select
            label="Mức độ"
            sx={{ gridColumn: "span 2" }}
            defaultValue={1}
            value={data.message_type}
            onChange={(e) => setData({...data, message_type: e.target.value })}
          >
            <MenuItem value={1} >Khẩn cấp</MenuItem>
            <MenuItem value={2} >Trung bình</MenuItem>
            <MenuItem value={3} >Nhẹ</MenuItem>
          </TextField>
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Liên lạc"
            value={data.contact}
            onChange={(e) => setData({...data, contact: e.target.value })}
            sx={{ gridColumn: "span 4" }}
          />
          
        </Box>
        <Box display="flex" justifyContent="space-between" mt="20px">
          <Button type="submit" onClick={handleSubmit} color="secondary" variant="contained" sx={{p:1}}>
            Tạo mới
          </Button>
          <Button onClick={props.handleClose} color="secondary" variant="contained" sx={{p:1}}>
              Đóng
            </Button>
        </Box>
      </form>
    </Box>
  );
};

export default WarningForm;
