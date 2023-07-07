import { Box, Typography, useTheme } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    {
      field: "name",
      headerName: "Tên",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Tuổi",
      type: "number",
      headerAlign: "left",
      align: "left",
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
            width="60%"
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
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

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
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
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
          checkboxSelection
          rows={mockDataTeam}
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
          slotProps={{ filterPanel: { linkOperators: ['and'] } }}
        />
      </Box>
    </Box>
  );
};

export default Team;
