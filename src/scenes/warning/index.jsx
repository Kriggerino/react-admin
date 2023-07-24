import {
  Box,
  Typography,
  useTheme,
  TextField,
  Container,
  MenuItem,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import WarningForm from "../warningform";
const Warning = ({userid, access}) => {
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

  function CustomToolbar() {
    const [filter, setFilter] = useState({
      type:'',
      status: '',
      name: '',
    })
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
    const warningSearch = () =>{
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
    }
    return (
      <GridToolbarContainer
        sx={{ justifyContent: "space-between", display: "inline-flex", p: 0 }}
      >
        {/* <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarExport /> */}
        <Container
          disableGutters={true}
          sx={{
            display: "flex",
            gap: "50px",
            ml: 0,
            mr: 0,
            width: "60%",
            justifyContent: "space-between",
          }}
          maxWidth={false}
          minwidth={false}
        >
          <TextField
            type="text"
            select
            label="Mức độ"
            name="type"
            sx={{ width: "25%", mt: 2, mb: 2, p: 0 }}
            value={filter.type}
            onChange={(e) =>
              setFilter({ ...filter, type: e.target.value })
            }
          >
            <MenuItem value={1}>Khẩn cấp</MenuItem>
            <MenuItem value={2}>Trung bình</MenuItem>
            <MenuItem value={3}>Nhẹ</MenuItem>
          </TextField>
          <TextField
            type="text"
            select
            label="Trạng thái"
            name="status"
            sx={{ width: "25%", mt: 2, mb: 2, p: 0 }}
            value={filter.status}
            onChange={(e) =>
              setFilter({...filter, status: e.target.value})
            }
          >
            <MenuItem value={0}>Chờ xử lý</MenuItem>
            <MenuItem value={1}>Đã xử lý</MenuItem>
          </TextField>
          <TextField 
            type="text"
            label="Tên cảnh báo"
            name="name"
            sx={{ width: "25%", mt: 2, mb: 2, p:0}}
            value={filter.name}
            onChange={(e) =>
              setFilter({...filter, name: e.target.value})
            }
          />
        </Container>
        <Container sx={{ display: "flex" , width: "20%", ml: 0, mr: 0, gap: "30px", pt: 2, pb: 2, pl: 0, pr:0}}>
          <Button color="secondary" variant="contained" onClick={warningSearch} >Tìm kiếm</Button>
          <Button color="secondary" variant="contained" onClick={handleOpen}>Tạo mới</Button>
        </Container>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <WarningForm userid ={userid} access={access} />
              <Box display="flex" justifyContent="end" mt="20px" mr="20px" >
              <Button onClick={handleClose} color="secondary" variant="contained" sx={{ pb:2, pt:2}} >Đóng</Button>
              </Box>
            </Box>
          </Modal>
      </GridToolbarContainer>
    );
  }
  //Handle functions
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
      flex: 1,
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
              color={colors.grey[500]}
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
      field: "username",
      headerName: "Người thiết lập",
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
      headerName: "Thao tac",
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
          getRowId={apiData.id}
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

export default Warning;
