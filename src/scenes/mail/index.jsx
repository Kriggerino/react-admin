import { Button, Box, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const Email = () => {
  const [data, setData] = useState({
    targetMail: "",
  });
  const handleEmail = () => {
    axios
      .post(" https://node-service-ihr4.onrender.com/mail", data)
      .then((res) => {
        if (res.msg === "Success") {
          console.log("success");
        } else {
          console.log("fail");
        }
      });
  };
  return (
    <Box>
      <Box sx={{ width: "100%",  p:2 }}>
        <TextField
          sx={{ width: "50%", mx: "auto", display: "flex" }}
          variant="filled"
          type="text"
          label="Địa chỉ"
          onChange={(e) =>
            setData({ ...data, targetMail: e.target.value })
          }
          value={data.targetMail}
          name="targetMail"
        />
      </Box>

      <Button
        sx={{ mx: "auto", display: "flex" }}
        variant="contained"
        color="secondary"
        onClick={handleEmail}
      >
        Email check
      </Button>
    </Box>
  );
};

export default Email;
