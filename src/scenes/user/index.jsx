import {
  Box,
  Typography,
  useTheme,
  InputAdornment,
  TextField,
  MenuItem,
  Container,
} from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Modal from "@mui/material/Modal";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Form from "../form/index";
const User = ({access}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [apiData, setApiData] = useState([]);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:8001/delete/" + id)
      .then((res) => {
        if (res.data.Status === "Success") {
          window.location.reload();
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
    },
    {
      field: "firstname",
      headerName: "Họ",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "lastname",
      headerName: "Tên",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Số điện thoại",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "accessLevel",
      headerName: "Quyền truy cập",
      flex: 1,
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
      headerName: "Thao tac",
      flex: 1,
      renderCell: (params) => {
        return (
          <div>
            <Button>
              <Link to={`/user/userEdit/` + params.row._id} className="btn">
                Sửa
              </Link>
            </Button>
            <Button
              onClick={(e) => handleDelete(params.row._id)}
              className="btn"
            >
              Xóa
            </Button>
          </div>
        );
      },
    },
  ];

  function CustomToolbar() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [filter, setFilter] = useState({
      accessFilter: "",
      usernameFilter: "",
    });
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
    const handleSearch = () => {
      console.log(filter);
      axios
        .post("http://localhost:8001/getUserfilter", filter)
        .then((res) => {
          if (res.data.Status === "Success") {
            setApiData(res.data.Result);
          } else {
            alert("Error");
          }
        })
        .catch((err) => console.log(err));
    };
    return (
      <GridToolbarContainer sx={{justifyContent: "space-between", display: "inline-flex"}}>
        {/* <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarExport /> */}
        <Container disableGutters="true" sx={{display: "flex", gap: "50px", ml: 0, mr: 0, width: "75%"}}>
        <TextField
          type="text"
          label="Quyền"
          name="access"
          value={filter.accessFilter}
          onChange={(e) =>
            setFilter({ ...filter, accessFilter: e.target.value })
          }
          select
          sx={{ width: "25%", mt: 2, mb: 2, p:0 }}
        >
          <MenuItem value={"admin"}>Admin</MenuItem>
          <MenuItem value={"user"}>User</MenuItem>
        </TextField>
        <TextField
          type="text"
          label="Tên người dùng"
          name="username"
          value={filter.usernameFilter}
          onChange={(e) =>
            setFilter({ ...filter, usernameFilter: e.target.value })
          }
          sx={{ width: "25%", mt: 2, mb: 2, p:0 }}
        />
        {/* <TextField
          type="text"
          label=""
          name=""
          sx={{ width: "25%", mt: 2, mb: 2, p:0 }}
        /> */}
        </Container>
        <Container disableGutters="true" sx={{ display: "flex" , width: "20%", ml: 0, mr: 0, gap: "30px", pt: 2, pb: 2}}>
          <Button color="secondary" variant="contained" onClick={handleSearch} sx={{pt: 1, pb: 1}}>Tìm kiếm</Button>
          <Button color="secondary" variant="contained" onClick={handleOpen} sx={{pt:1, pb: 1}} >Tạo người dùng</Button>
        </Container>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Form access={access}/>
              <Box display="flex" justifyContent="end" mt="20px" mr="20px" >
              <Button onClick={handleClose} color="secondary" variant="contained" sx={{ pb:2, pt:2}} >Đóng</Button>
              </Box>
            </Box>
          </Modal>
      </GridToolbarContainer>
    );
  }

  useEffect(() => {
    axios
      .get("http://localhost:8001/getUser")
      .then((res) => {
        if (res.data.Status === "Success") {
          setApiData(res.data.Result);
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box m="20px">
      <Header title="Người dùng" subtitle="Danh sách người dùng" />
      <Box
        m="40px 0 0 0"
        height="75vh"
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
          getRowId={(row) => row._id}
          columns={columns}
          slots={{ toolbar: CustomToolbar }}
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
