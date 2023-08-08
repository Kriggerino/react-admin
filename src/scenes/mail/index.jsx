import { Button, Box, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const Email = () => {
  const [targetMail, setTargetMail] = useState("");
  const handleEmail = () => {
    axios
      .post(" https://node-service-ihr4.onrender.com/mail", targetMail)
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
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Địa chỉ"
        onChange={(e) => setTargetMail(e.target.value)}
        value={targetMail}
        name="targetMail"
      />

      <Button onClick={handleEmail}>Email check</Button>
    </Box>
  );
};

export default Email;
