import {
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import {
  DataGrid,
} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import CustomWarningToolbar from "../../components/CustomWarningToolbar";
const Warning = ({ userid, access }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
      width: 400 ,
      cellClassName: "name-column--cell",
    },
    {
      field: "message_info",
      headerName: "Mức độ cảnh báo",
      headerAlign: "center",
      flex: 1,
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
                : colors.grey[500]}
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
      flex: 1,
    },
    {
      field: "contact",
      headerName: "Mối liên lạc",
      flex: 1,
    },
    {
      field: "created_time",
      headerName: "Thời gian khởi tạo",
      flex: 1,
    },
    {
      field: "updated_time",
      headerName: "Thời gian cập nhật",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Thao tác",
      headerAlign: "center",
      flex: 1,
      renderCell: (params) => {
        return (
          <div>
            <Button>
              <Link
                to={`/warning/warningEdit/` + params.row.id}
                className="btn"
              >
                Sửa
              </Link>
            </Button>
            <Button
              onClick={(e) => handleDelete(params.row.id)}
              className="btn"
            >
              Xóa
            </Button>
          </div>
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
            borderRight: "1px grey solid",
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
