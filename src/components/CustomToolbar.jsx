import {
    Box,
    TextField,
    MenuItem,
    Container,
  } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { GridToolbarContainer } from "@mui/x-data-grid";
import Form from "../scenes/form";
import Modal from "@mui/material/Modal";
const CustomToolbar = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <GridToolbarContainer
      sx={{ justifyContent: "space-between", display: "inline-flex", p: 0 }}
    >
      {/* <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarExport /> */}
      <Container
        disableGutters="true"
        sx={{ display: "flex", gap: "50px", ml: 0, mr: 0, width: "75%" }}
      >
        <TextField
          type="text"
          label="Quyền"
          name="access"
          value={props.filter.accessFilter}
          onChange={(e) =>
            props.setFilter({ ...props.filter, accessFilter: e.target.value })
          }
          select
          sx={{ width: "25%", mt: 2, mb: 2, p: 0 }}
        >
          <MenuItem value={"admin"}>Admin</MenuItem>
          <MenuItem value={"user"}>User</MenuItem>
        </TextField>
        <TextField
          type="text"
          label="Tên người dùng"
          name="username"
          value={props.filter.usernameFilter}
          onChange={(e) =>
            props.setFilter({ ...props.filter, usernameFilter: e.target.value })
          }
          sx={{ width: "25%", mt: 2, mb: 2, p: 0 }}
        />
        {/* <TextField
          type="text"
          label=""
          name=""
          sx={{ width: "25%", mt: 2, mb: 2, p:0 }}
        /> */}
      </Container>
      <Container
        disableGutters="true"
        sx={{
          display: "flex",
          width: "20%",
          ml: 0,
          mr: 0,
          gap: "30px",
          pt: 2,
          pb: 2,
        }}
      >
        <Button
          color="secondary"
          variant="contained"
          onClick={props.handleSearch}
          sx={{ pt: 2, pb: 2 }}
        >
          Tìm kiếm
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={handleOpen}
          sx={{ pt: 2, pb: 2 }}
        >
          Tạo người dùng
        </Button>
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Form permission={props.permission} handleClose={handleClose} setTableUpdate={props.setTableUpdate} />
        </Box>
      </Modal>
    </GridToolbarContainer>
  );
};

export default CustomToolbar;
