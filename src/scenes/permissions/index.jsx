import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

//Icons and toolbar
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import BuildIcon from "@mui/icons-material/Build";
import CustomPermToolbar from "../../components/CustomPermToolbar";
const Permissions = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    axios
      .get(" http://localhost:8001/getPermissions")
      .then((res) => {
        if (res.data.Status === "Success") {
          setPermissionTable(res.data.Result);
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
    .delete(" http://localhost:8001/deletePerm/", id)
    .then((res) => {
      if (res.data.Status === "Success") {
        window.location.reload();
      } else {
        alert("Error");
      }
    })
    .catch((err) => console.log(err));
  }

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
            <IconButton sx={{ padding: "5px", m: 0, minWidth: 0 }}>
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
              onClick = {handleDelete(params.row.id)}
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
      <Header title="Phân quyền" />
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
        />
      </Box>
    </Box>
  );
};

export default Permissions;
