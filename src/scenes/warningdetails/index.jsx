import React, { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import {
  Box,
  CardContent,
  Card,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const WarningDetails = ({permission}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [data, setData] = useState({
    message: "",
    message_info: "",
    contact: "",
    status_info: "",
    created_time: "",
    updated_time: "",
  });

  useEffect(() => {
    if(permission.warning_read !== 1){
      navigate("/denyaccess");
    }
    else{
    axios
      .get(" https://node-service-ihr4.onrender.com/getWarningDetail/" + id)
      .then((res) => {
        setData({
          ...data,
          message: res.data.Result[0].message,
          message_info: res.data.Result[0].message_info,
          contact: res.data.Result[0].contact,
          status_info: res.data.Result[0].status_info,
          created_time: res.data.Result[0].created_time,
          updated_time: res.data.Result[0].updated_time,
        });
        console.log(data);
      })
      .catch((err) => console.log(err));
    }
  }, []);
  return (
    <Box m="20px">
      <Header title="Chi tiết" />

      <form>
        <Card
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            width: "80%",
            mx: "auto",
            bgcolor: "#FAF9F6",
          }}
        >
          <CardContent
            fullWidth
            variant="filled"
            type="text"
            sx={{
              gridColumn: "span 2",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", p: 2 }}>
              <Typography variant="h5" fontWeight="bold" sx={{ p: 2 }}>
                Tên cảnh báo:
              </Typography>
              <Typography variant="h5" sx={{ p: 2 }}>
                {data.message}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", p: 2 }}>
              <Typography variant="h5" fontWeight="bold" sx={{ p: 2 }}>
                Mức độ cảnh báo:
              </Typography>
              <Typography variant="h5" sx={{ p: 2 }} 
              color={data.message_info === "Khẩn cấp"
                  ? "#C70039"
                  : data.message_info === "Trung bình"
                  ? "#FFC300"
                  : "#DAF7A6"}>
                {data.message_info}
              </Typography>
            </Box>
          </CardContent>
          <CardContent
            fullWidth
            variant="filled"
            label="Thời gian khởi tạo"
            sx={{
              gridColumn: "span 2",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", p: 2 }}>
              <Typography variant="h5" fontWeight="bold" sx={{ p: 2 }}>
                Thời gian khởi tạo:
              </Typography>
              <Typography variant="h5" sx={{ p: 2 }}>
                {data.created_time}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", p: 2 }}>
              <Typography variant="h5" fontWeight="bold" sx={{ p: 2 }}>
                Thời gian cập nhật:
              </Typography>
              <Typography variant="h5" sx={{ p: 2 }}>
                {data.updated_time}
              </Typography>
            </Box>
          </CardContent>
          <CardContent
            fullWidth
            variant="filled"
            type="text"
            label="Liên lạc"
            sx={{ gridColumn: "span 2", display: "flex" }}
          >
            <Typography variant="h5" fontWeight="bold" sx={{ p: 4 }}>
              Trạng thái cảnh báo:
            </Typography>
            <Typography variant="h5" sx={{ p: 4 }}>
              {data.status_info}
            </Typography>
          </CardContent>
          <CardContent
            fullWidth
            variant="filled"
            label="Trạng thái"
            sx={{ gridColumn: "span 2", display: "flex" }}
          >
            <Typography variant="h5" fontWeight="bold" sx={{ p: 4 }}>
              Mối liên lạc:
            </Typography>
            <Typography variant="h5" sx={{ p: 4 }}>
              {data.contact}
            </Typography>
          </CardContent>
        </Card>
      </form>
    </Box>
  );
};

export default WarningDetails;
