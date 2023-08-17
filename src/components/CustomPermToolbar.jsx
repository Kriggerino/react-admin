import {
  Box,
  TextField,
  MenuItem,
  Container,
  Button,
  Modal,
  Typography,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { GridToolbarContainer } from "@mui/x-data-grid";
import PermCreate from "../scenes/permissions/permissioncreate";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CustomPermToolbar = ({setTableUpdate, permission}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <GridToolbarContainer
      sx={{ justifyContent: "space-between", display: "inline-flex", p: 0 }}
    >
      <Container
        disableGutters={true}
        sx={{ display: "flex", gap: "50px", ml: 0, mr: 0, width: "75%" }}
      >
        <TextField
          type="text"
          label="Quyền"
          sx={{ width: "25%", mt: 2, mb: 2, p: 0 }}
        ></TextField>
      </Container>
      <Container
        disableGutters={true}
        sx={{
          display: "flex",
          width: "20%",
          ml: 0,
          mr: 0,
          pt: 2,
          pb: 2,
          justifyContent: "end",
          gap:"30px",
        }}
      >
        <Button color="secondary" variant="contained" sx={{pt: 1, pb: 1}}>
          Tìm kiếm
        </Button>
        <Button color="secondary" variant="contained" onClick={handleOpen} sx={{ pt: 1, pb: 1 }}>
          Tạo mới
        </Button>
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Box sx={{display: "flex", width: "100%", mx: "auto"}}>
              <PermCreate handleClose={handleClose} setTableUpdate={setTableUpdate} permission={permission}/>
            </Box>
            <Box sx={{display: "flex", justifyContent:"center", p:1, gap: "20px" }}>
                <Button color="secondary" variant="contained" onClick={handleClose} >
                    Hủy
                </Button>
            </Box>
        </Box>
      </Modal>
    </GridToolbarContainer>
  );
};

export default CustomPermToolbar;
