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
import Modal from "@mui/material/Modal";
import UserEdit from "./useredit";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "90%",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,

};

const User = ({ permission, access }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [apiData, setApiData] = useState([]);
  const [editId, setEditId] = useState(0);
  //Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
      align: "center",
    },
    {
      field: "firstname",
      headerName: "Họ",
      flex: 1,
      cellClassName: "name-column--cell",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "lastname",
      headerName: "Tên",
      flex: 1,
      cellClassName: "name-column--cell",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "phone",
      headerName: "Số điện thoại",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      headerAlign: "center",
      align: "center",
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
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div>
            <Button
              onClick={(e) => {
                setEditId(params.row._id);
                handleOpen();
              }}
            >
              <BuildIcon />
            </Button>
            <Button
              onClick={(e) => handleDelete(params.row._id)}
              className="btn"
            >
              <DeleteIcon />
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
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <UserEdit access={access} id={editId}/>
          </Box>
        </Modal>
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
