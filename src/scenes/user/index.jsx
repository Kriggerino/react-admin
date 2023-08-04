import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import CustomToolbar from "../../components/CustomToolbar";
import DeleteIcon from "@mui/icons-material/Delete";
import BuildIcon from "@mui/icons-material/Build";
const User = ({ permission }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [apiData, setApiData] = useState([]);
  const [filter, setFilter] = useState({
    accessFilter: "",
    usernameFilter: "",
  });
  const [tableUpdate, setTableUpdate] = useState(false);
  const handleDelete = (id) => {
    axios
      .delete(" https://node-service-ihr4.onrender.com/delete/" + id)
      .then((res) => {
        if (res.data.Status === "Success") {
          window.location.reload();
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSearch = () => {
    axios
      .post(" https://node-service-ihr4.onrender.com/getUserfilter", filter)
      .then((res) => {
        if (res.data.Status === "Success") {
          setApiData(res.data.Result);
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  };
  const columns = [
    {
      field: "username",
      headerName: "Tên người dùng",
      flex: 1,
      cellClassName: "name-column--cell",
      headerAlign: "center",
    },
    {
      field: "firstname",
      headerName: "Họ",
      flex: 1,
      cellClassName: "name-column--cell",
      headerAlign: "center",
    },
    {
      field: "lastname",
      headerName: "Tên",
      flex: 1,
      cellClassName: "name-column--cell",
      headerAlign: "center",
    },
    {
      field: "phone",
      headerName: "Số điện thoại",
      flex: 1,
      headerAlign: "center",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      headerAlign: "center",
    },
    {
      field: "accessLevel",
      headerName: "Quyền truy cập",
      flex: 1,
      headerAlign: "center",
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="80%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === "admin"
                ? colors.greenAccent[600]
                : access === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "manager" && <SecurityOutlinedIcon />}
            {access === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "action",
      headerName: "Thao tác",
      flex: 1,
      renderCell: (params) => {
        return (
          <div>
            <Button>
              <Link
                style={{ textDecoration: "none", color: "#423f3f" }}
                to={`/user/userEdit/` + params.row._id}
                className="btn"
              >
                <BuildIcon />
              </Link>
            </Button>
            <Button
              onClick={(e) => handleDelete(params.row._id)}
              className="btn"
            >
              <Link style={{ textDecoration: "none", color: "#423f3f" }}>
                <DeleteIcon />
              </Link>
            </Button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    if (permission.user_read !== 1) {
      navigate("/denyaccess");
    } else {
      axios
        .get(" https://node-service-ihr4.onrender.com/getUser")
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

  return (
    <Box m="20px">
      <Header title="Người dùng" subtitle="Danh sách người dùng" />
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
        <DataGrid
          rows={apiData}
          getRowId={(row) => row._id}
          columns={columns}
          slots={{ toolbar: CustomToolbar }}
          slotProps={{
            toolbar: {
              handleSearch: handleSearch,
              filter: filter,
              permission: permission,
              setFilter: setFilter,
              setTableUpdate: setTableUpdate,
            },
          }}
          localeText={{
            //Main buttons
            toolbarColumns: "Cột",
            toolbarFilters: "Tìm kiếm",
            toolbarExport: "Xuất ra file",
            // Columns panel text
            columnsPanelTextFieldLabel: "Tìm cột",
            columnsPanelTextFieldPlaceholder: "Tên cột...",
            columnsPanelDragIconLabel: "Sắp xếp cột",
            columnsPanelShowAllButton: "Hiển thị tất cả",
            columnsPanelHideAllButton: "Ẩn tất cả",
            //Filter panel text
            filterPanelAddFilter: "Thêm bộ tìm kiếm",
            filterPanelDeleteIconLabel: "Xóa",
            filterPanelLinkOperator: "Logic tìm kiếm",
            filterPanelOperators: "Operator", // TODO v6: rename to filterPanelOperator
            filterPanelOperatorAnd: "Và",
            filterPanelOperatorOr: "Hoặc",
            filterPanelColumns: "Cột",
            filterPanelInputLabel: "Giá trị",
            filterPanelInputPlaceholder: "Giá trị tìm kiếm",
            //Filter operators
            filterOperatorContains: "Chứa",
            filterOperatorEquals: "Bằng",
            filterOperatorStartsWith: "Bắt đầu bằng",
            filterOperatorEndsWith: "Kết thúc bằng",
            filterOperatorIs: "là",
            filterOperatorNot: "không là",
            filterOperatorAfter: "đứng sau",
            filterOperatorOnOrAfter: "ở tại hoặc đứng sau",
            filterOperatorBefore: "is before",
            filterOperatorOnOrBefore: "is on or before",
            filterOperatorIsEmpty: "Rỗng",
            filterOperatorIsNotEmpty: "Không rỗng",
            filterOperatorIsAnyOf: "Có bất kỳ",
          }}
        />
      </Box>
    </Box>
  );
};

export default User;
