import {
  Box,
  IconButton,
  Typography,
  useTheme,
  Modal,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CustomWarningToolbar from "../../components/CustomWarningToolbar";
import WarningEdit from "../warningedit";
//Icons
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import BuildIcon from "@mui/icons-material/Build";

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

const Warning = ({ userid, access }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [apiData, setApiData] = useState({
    id: "",
    message: "",
    message_info: "",
    status_info: "",
    contact: "",
    username: "",
  });
  const [filter, setFilter] = useState({
    type: "",
    status: "",
    name: "",
  });
  //On load, get data
  useEffect(() => {
    axios
      .get("http://localhost:8001/getWarning")
      .then((res) => {
        if (res.data.Status === "Success") {
          setApiData(res.data.Result);
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const warningSearch = () => {
    console.log(filter);
    axios
      .post("http://localhost:8001/getWarningfilter", filter)
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
      .delete("http://localhost:8001/deleteWarning/" + id)
      .then((res) => {
        if (res.data.Status === "Success") {
          window.location.reload();
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  };

  //Datagrid columns

  const columns = [
    {
      field: "message",
      headerName: "Cảnh báo",
      width: 350,
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
      field: "contact",
      headerName: "Mối liên lạc",
      width: 220,
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
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <IconButton sx={{ padding: "5px", m: 0, minWidth: 0 }}>
              <Link
                to={`/warning/warningEdit/` + params.row.id}
                style={{ textDecoration: "none", color: "#423f3f" }}
              >
                <BuildIcon />
              </Link>
            </IconButton>
            <IconButton
              onClick={(e) => handleDelete(params.row.id)}
              className="btn"
              sx={{ padding: "5px", m: 0, minWidth: 0, color: "#423f3f" }}
            >
              <Link style={{ textDecoration: "none", color: "#423f3f" }}>
                <DeleteIcon />
              </Link>
            </IconButton>
            <IconButton sx={{ padding: "5px", m: 0, minWidth: 0 }}>
              <Link
                to={`/warning/warningDetails/` + params.row.id}
                className="btn"
                style={{ textDecoration: "none", color: "#423f3f" }}
              >
                <VisibilityIcon />
              </Link>
            </IconButton>
          </Box>
        );
      },
    },
  ];
  return (
    <Box m="20px">
      <Header title="Cảnh báo" subtitle="Danh sách cảnh báo" />
      <Box
        m="10px 0 0 0"
        height="85vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "rgba(244, 245, 250, 0.78)",
            borderBottom: "1px grey solid",
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
        <DataGrid
          rows={apiData}
          getRowId={apiData.id}
          columns={columns}
          checkboxSelection
          slots={{ toolbar: CustomWarningToolbar }}
          slotProps={{
            toolbar: {
              filter: filter,
              setFilter: setFilter,
              access: access,
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
