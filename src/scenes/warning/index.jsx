import {
  Box,
  TextField,
  Button,
  IconButton,
  Typography,
  useTheme,
  MenuItem,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomWarningToolbar from "../../components/CustomWarningToolbar";
import Modal from "@mui/material/Modal";
//Icons
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import BuildIcon from "@mui/icons-material/Build";
import WarningEdit from "./warningedit";
//Datepicker
import { subDays } from "date-fns";
//Loading page
import { ThemeProvider } from "@mui/material";
import LoadingPage from "../../components/LoadingPage";
import CustomNoRowsOverlay from "../../components/NoRowsOverlay";
const Warning = ({ userid, permission }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [tableUpdate, setTableUpdate] = useState(false);
  const [selectedId, setSelectedId] = useState([]);

  //Create modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //Edit Modal
  const [editOpen, setEditOpen] = useState(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);
  const [editId, setEditId] = useState(0);

  //Daterange
  let currentDate = new Date();

  //Multi Edit
  const [multiEditOpen, setMultiEditOpen] = useState(false);
  const [multiEditState, setMultiEditState] = useState(-1);
  const handleMultiEditOpen = () => setMultiEditOpen(true);
  const handleMultiEditClose = () => setMultiEditOpen(false);

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
  const editStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    height: "50%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [apiData, setApiData] = useState({
    id: "",
    message: "",
    message_info: "",
    status_info: "",
    contact: "",
    username: "",
    system: "",
  });
  const [filter, setFilter] = useState({
    type: "",
    status: "",
    name: "",
    system: "",
    dateRange: {
      startDate: subDays(currentDate, 7),
      endDate: currentDate,
      key: "selection",
    },
  });
  const navigate = useNavigate();
  //On load, get data
  useEffect(() => {
    if (permission.warning_read !== 1) {
      navigate("/denyaccess");
    } else {
      axios
        .get("https://node-service-ihr4.onrender.com/getWarning")
        .then((res) => {
          if (res.data.Status === "Success") {
            setApiData(res.data.Result);
            setTableUpdate(false);
          } else {
            alert("Error");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [tableUpdate]);

  const warningSearch = () => {
    console.log(filter);
    axios
      .post("https://node-service-ihr4.onrender.com/getWarningfilter", filter)
      .then((res) => {
        if (res.data.Status === "Success") {
          setApiData(res.data.Result);
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete("https://node-service-ihr4.onrender.com/deleteWarning/" + id)
      .then((res) => {
        if (res.data.Status === "Success") {
          setTableUpdate(true);
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteMultiple = (selectedId) => {
    console.log(selectedId);
    axios
      .post(
        "https://node-service-ihr4.onrender.com/deleteMultipleWarning/",
        selectedId
      )
      .then((res) => {
        setSelectedId([]);
        if (res.data.Status === "Success") {
          handleClose();
          setTableUpdate(true);
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleEditMultiple = (selectedId) => {
    console.log(selectedId);
    axios
      .post("https://node-service-ihr4.onrender.com/editMultipleWarning/", {
        id: selectedId,
        value: multiEditState,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  //Datagrid columns

  const columns = [
    {
      field: "message",
      headerName: "Cảnh báo",
      width: 350,
      flex: 2,
      cellClassName: "name-column--cell",
    },
    {
      field: "message_info",
      headerName: "Mức độ cảnh báo",
      headerAlign: "center",
      width: 150,
      renderCell: ({ row: { message_info } }) => {
        return (
          <Box
            width="80%"
            height="80%"
            m="0 auto"
            justifyContent="center"
            display="flex"
            backgroundColor={
              message_info === "Khẩn cấp"
                ? "#eb463b"
                : message_info === "Trung bình"
                ? "#cfba36"
                : "#96e67e"
            }
            borderRadius="4px"
          >
            <Typography
              color={
                message_info === "Khẩn cấp"
                  ? colors.grey[200]
                  : colors.grey[500]
              }
              alignSelf="center"
              sx={{ ml: "5px" }}
            >
              {message_info}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "status_info",
      headerName: "Trạng thái",
      width: 80,
    },
    {
      field: "system_name",
      headerName: "Hệ thống liên quan",
      width: 220,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "created_time",
      headerName: "Thời gian khởi tạo",
      width: 150,
    },
    {
      field: "updated_time",
      headerName: "Thời gian cập nhật",
      width: 150,
    },
    {
      field: "action",
      headerName: "Thao tác",
      headerAlign: "center",
      flex: 1,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              display: "flex",
              WebkitBoxAlign: "center",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-evenly",
            }}
          >
            {permission.warning_write ? (
              <Box>
                <IconButton
                  sx={{ padding: "5px", m: 0, minWidth: 0 }}
                  onClick={(e) => {
                    setEditId(params.row.id);
                    handleEditOpen();
                  }}
                >
                  <BuildIcon />
                </IconButton>
              </Box>
            ) : undefined}

            {permission.warning_write ? (
              <Box>
                <IconButton
                  onClick={(e) => handleDelete(params.row.id)}
                  className="btn"
                  sx={{ padding: "5px", m: 0, minWidth: 0 }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ) : undefined}

            <IconButton sx={{ padding: "5px", m: 0, minWidth: 0 }}>
              <VisibilityIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  if (!apiData) {
    return (
      <ThemeProvider theme={theme}>
        <div className="app">
          <LoadingPage />
        </div>
      </ThemeProvider>
    );
  }

  return (
    <Box m="20px">
      <Box
        m="10px 0 0 0"
        height="85vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
            fontSize: "0.85rem",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "rgba(244, 245, 250, 0.78)",
            borderBottom: "1px grey solid",
            fontSize: "0.85rem",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <Box sx={{ display: "flex", gap: "30px" }}>
          <Button
            onClick={handleMultiEditOpen}
            variant="contained"
            color="secondary"
          >
            Edit Selected
          </Button>

          <Button onClick={handleOpen} variant="contained" color="error">
            Delete Selected
          </Button>
        </Box>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                py: 2,
              }}
            >
              <Typography variant="h5">Chắc chắn xóa?</Typography>
            </Box>
            <Box
              sx={{
                justifyContent: "flex-end",
                display: "flex",
                py: 2,
                gap: "20px",
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                onClick={(e) => {
                  handleDeleteMultiple(selectedId);
                }}
              >
                Xác nhận
              </Button>
              <Button
                variant="contained"
                onClick={handleClose}
                color="secondary"
              >
                Đóng
              </Button>
            </Box>
          </Box>
        </Modal>
        <Modal
          open={editOpen}
          onClose={handleEditClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={editStyle}>
            <WarningEdit
              id={editId}
              permission={permission}
              handleEditClose={handleEditClose}
            />
          </Box>
        </Modal>
        <Modal
          open={multiEditOpen}
          onClose={handleMultiEditClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                py: 2,
              }}
            >
              <Typography variant="h5">
                Chỉnh sửa trạng thái cảnh báo thành:
              </Typography>
              <TextField
                type="text"
                select
                label="Trạng thái"
                name="status"
                sx={{ width: "60%", mt: 2, mb: 2, p: 2 }}
                value={multiEditState}
                onChange={(e) => setMultiEditState(e.target.value)}
              >
                <MenuItem value={-1}>... </MenuItem>
                <MenuItem value={0}>Chờ xử lý</MenuItem>
                <MenuItem value={1}>Đã xử lý</MenuItem>
              </TextField>
            </Box>

            <Box
              sx={{
                justifyContent: "flex-end",
                display: "flex",
                py: 2,
                gap: "20px",
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                onClick={(e) => {
                  handleEditMultiple(selectedId);
                }}
              >
                Xác nhận
              </Button>
              <Button
                variant="contained"
                onClick={handleMultiEditClose}
                color="secondary"
              >
                Đóng
              </Button>
            </Box>
          </Box>
        </Modal>

        <DataGrid
          rows={apiData}
          getRowId={apiData.id}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={(ids) => {
            setSelectedId(ids);
          }}
          slots={{
            toolbar: CustomWarningToolbar,
            noRowsOverlay: CustomNoRowsOverlay,
          }}
          slotProps={{
            toolbar: {
              filter: filter,
              setFilter: setFilter,
              permission: permission,
              userid: userid,
              warningSearch: warningSearch,
            },
          }}
          localeText={{
            toolbarExport: "Xuất file",
            toolbarExportLabel: "Xuất file",
            toolbarExportCSV: "Tải CSV",
            toolbarExportPrint: "In",
            toolbarExportExcel: "Tải Excel",
          }}
        />
      </Box>
    </Box>
  );
};

export default Warning;
