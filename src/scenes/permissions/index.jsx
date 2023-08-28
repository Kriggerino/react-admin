import { Box, IconButton, Modal, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

//Icons and toolbar
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import BuildIcon from "@mui/icons-material/Build";
import CustomPermToolbar from "../../components/CustomPermToolbar";
import PermEdit from "./permissionedit";
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
const Permissions = ({ permission }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [tableUpdate, setTableUpdate] = useState(false);
  //Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [editId, setEditId] = useState(0);
  useEffect(() => {
    if (!permission.permission_read) {
      navigate("/denyaccess");
    } else {
      axios
        .get(" https://node-service-ihr4.onrender.com/getPermissions")
        .then((res) => {
          if (res.data.Status === "Success") {
            setPermissionTable(res.data.Result);
            setTableUpdate(false);
          } else {
            alert("Error");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [tableUpdate]);

  const handleDelete = (id) => {
    axios
      .delete(" https://node-service-ihr4.onrender.com/deletePerm/" + id)
      .then((res) => {
        if (res.data.Status === "Success") {
          alert("Success");
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  };

  
  const [permissionTable, setPermissionTable] = useState({
    id: 0,
    access_name: "",
    user_create: 0,
    user_read: 0,
    user_write: 0,
    warning_create: 0,
    warning_read: 0,
    warning_write: 0,
    permission_create: 0,
    permission_read: 0,
    permission_write: 0,
  });

  const dgColumns = [
    {
      field: "access_name",
      headerName: "Tên",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "user_create",
      headerName: "Tạo ",
      headerAlign: "center",
      align: "center",
      type: "boolean",
      valueGetter: ({ value }) => (value === 0 ? false : true),
      flex: 1,
    },
    {
      field: "user_read",
      headerName: "Đọc danh sách",
      headerAlign: "center",
      align: "center",
      type: "boolean",
      valueGetter: ({ value }) => (value === 0 ? false : true),
      flex: 1,
    },
    {
      field: "user_write",
      headerName: "Chỉnh sửa ",
      headerAlign: "center",
      align: "center",
      type: "boolean",
      valueGetter: ({ value }) => (value === 0 ? false : true),
      flex: 1,
    },
    {
      field: "warning_create",
      headerName: "Tạo",
      headerAlign: "center",
      align: "center",
      type: "boolean",
      valueGetter: ({ value }) => (value === 0 ? false : true),
      flex: 1,
    },
    {
      field: "warning_read",
      headerName: "Đọc danh sách",
      headerAlign: "center",
      align: "center",
      type: "boolean",
      valueGetter: ({ value }) => (value === 0 ? false : true),
      flex: 1,
    },
    {
      field: "warning_write",
      headerName: "Chỉnh sửa",
      headerAlign: "center",
      align: "center",
      type: "boolean",
      valueGetter: ({ value }) => (value === 0 ? false : true),
      flex: 1,
    },
    {
      field: "permission_create",
      headerName: "Tạo",
      headerAlign: "center",
      align: "center",
      type: "boolean",
      valueGetter: ({ value }) => (value === 0 ? false : true),
      flex: 1,
    },
    {
      field: "permission_read",
      headerName: "Đọc danh sách",
      headerAlign: "center",
      align: "center",
      type: "boolean",
      valueGetter: ({ value }) => (value === 0 ? false : true),
      flex: 1,
    },
    {
      field: "permission_write",
      headerName: "Chỉnh sửa",
      headerAlign: "center",
      align: "center",
      type: "boolean",
      valueGetter: ({ value }) => (value === 0 ? false : true),
      flex: 1,
    },
    {
      field: "action",
      headerName: "Thao tác",
      headerAlign: "center",
      width: 120,
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
            <IconButton sx={{ padding: "5px", m: 0, minWidth: 0 }}
              onClick={(e) => {
                setEditId(params.row.id);
                handleOpen();
              }}
            >
              <Link
                className="btn"
                style={{ textDecoration: "none", color: "#423f3f" }}
              >
                <BuildIcon />
              </Link>
            </IconButton>
            <IconButton
              className="btn"
              sx={{ padding: "5px", m: 0, minWidth: 0, color: "#423f3f" }}
              onClick={(e) => handleDelete(params.row.id)}
            >
              <Link style={{ textDecoration: "none", color: "#423f3f" }}>
                <DeleteIcon />
              </Link>
            </IconButton>
          </Box>
        );
      },
    },
  ];

  const dgColumnsGroup = [
    {
      groupId: "access",
      headerName: "",
      children: [{ field: "access_name" }],
    },
    {
      groupId: "user",
      headerName: "Người dùng",
      headerAlign: "center",
      children: [
        { field: "user_read" },
        { field: "user_create" },
        { field: "user_write" },
      ],
    },
    {
      groupId: "warning",
      headerName: "Cảnh báo",
      headerAlign: "center",
      children: [
        { field: "warning_read" },
        { field: "warning_create" },
        { field: "warning_write" },
      ],
    },
    {
      groupId: "perm",
      headerName: "Quyền hạn",
      headerAlign: "center",
      children: [
        { field: "permission_read" },
        { field: "permission_create" },
        { field: "permission_write" },
      ],
    },
    {
      groupId: "action",
      headerName: "",
      headerAlign: "center",
      children: [{ field: "action" }],
    },
  ];

  return (
    <Box m="20px">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <PermEdit id={editId} permission={permission} />
        </Box>
      </Modal>
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
          experimentalFeatures={{ columnGrouping: true }}
          disableRowSelectionOnClick
          disableGutters={true}
          rows={permissionTable}
          getRowId={permissionTable.id}
          columns={dgColumns}
          columnGroupingModel={dgColumnsGroup}
          slots={{ toolbar: CustomPermToolbar }}
          slotProps={{
            toolbar: {
              setTableUpdate: setTableUpdate,
              permission: permission,
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Permissions;
