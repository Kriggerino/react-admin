import { Box, TextField, Container, MenuItem, IconButton } from "@mui/material";
import Modal from "@mui/material/Modal";
import { GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import { useState } from "react";
import Button from "@mui/material/Button";
import WarningForm from "../scenes/warning/warningform";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CloseIcon from "@mui/icons-material/Close";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
//Daterange time calc
import {
  addDays,
  endOfDay,
  startOfDay,
  startOfYear,
  startOfMonth,
  endOfMonth,
  endOfYear,
  addMonths,
  addYears,
  startOfWeek,
  endOfWeek,
  isSameDay,
  differenceInCalendarDays,
} from "date-fns";
const CustomWarningToolbar = ({
  filter,
  setFilter,
  permission,
  userid,
  warningSearch,
  dateFilterClick,
  setDateFilterClick,
}) => {
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
          gap: "30px",
          ml: 0,
          mr: 0,
          width: "75%",
          justifyContent: "space-between",
        }}
        maxWidth="false"
        minwidth="false"
      >
        <TextField
          type="text"
          select
          label="Mức độ"
          name="type"
          sx={{ width: "25%", mt: 2, mb: 2, p: 0 }}
          value={filter.type}
          onChange={(e) => setFilter({ ...filter, type: e.target.value })}
        >
          <MenuItem> Không lọc </MenuItem>
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
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
        >
          <MenuItem> Không lọc </MenuItem>
          <MenuItem value={0}>Chờ xử lý</MenuItem>
          <MenuItem value={1}>Đã xử lý</MenuItem>
        </TextField>
        <TextField
          type="text"
          select
          label="Hệ thống"
          name="system"
          sx={{ width: "25%", mt: 2, mb: 2, p: 0 }}
          value={filter.system}
          onChange={(e) => setFilter({ ...filter, system: e.target.value })}
        >
          <MenuItem> Không lọc </MenuItem>
          <MenuItem value={1}>VO Service</MenuItem>
          <MenuItem value={2}>Hardware</MenuItem>
          <MenuItem value={3}>Network</MenuItem>
        </TextField>
        <TextField
          type="text"
          label="Tên cảnh báo"
          name="name"
          sx={{ width: "25%", mt: 2, mb: 2, p: 0 }}
          value={filter.name}
          onChange={(e) => setFilter({ ...filter, name: e.target.value })}
        />
        <IconButton onClick={(e) => setDateFilterClick(true)}>
          <CalendarMonthIcon />
        </IconButton>
      </Container>
      <Container
        sx={{
          display: "flex",
          width: "23%",
          ml: 0,
          mr: 0,
          p: 0,
          gap: "20px",
          justifyContent: "end",
        }}
      >
        <Button
          color="secondary"
          variant="contained"
          onClick={warningSearch}
          sx={{ fontSize: 12, fontWeight: "bold", py: 2 }}
        >
          Tìm kiếm
        </Button>
        {/* <Button color="secondary" variant="contained" onClick={handleOpen} sx={{ padding: "4px 8px"}}>
          Tạo mới
        </Button> */}
        <GridToolbarExport
          color="secondary"
          variant="contained"
          sx={{ fontSize: 12, fontWeight: "bold", py: 2 }}
          csvOptions={{
            fileName: "Cảnh báo",
            utf8WithBom: true,
          }}
        />
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <WarningForm
            userid={userid}
            permission={permission}
            handleClose={handleClose}
          />
        </Box>
      </Modal>
      <Modal
        open={dateFilterClick}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <DateRangePicker
            onChange={(item) =>
              setFilter({ ...filter, dateRange: item.selection })
            }
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={[filter.dateRange]}
            preventSnapRefocus={true}
            calendarFocus="forwards"
            staticRanges={[
              {
                label: "Tháng trước",
                range: () => ({
                  startDate: startOfMonth(addMonths(new Date(), -1)),
                  endDate: endOfMonth(addMonths(new Date(), -1)),
                }),
                isSelected(range) {
                  const definedRange = this.range();
                  return (
                    isSameDay(range.startDate, definedRange.startDate) &&
                    isSameDay(range.endDate, definedRange.endDate)
                  );
                },
              },
              {
                label: "Tháng này",
                range: () => ({
                  startDate: startOfMonth(new Date()),
                  endDate: endOfDay(new Date()),
                }),
                isSelected(range) {
                  const definedRange = this.range();
                  return (
                    isSameDay(range.startDate, definedRange.startDate) &&
                    isSameDay(range.endDate, definedRange.endDate)
                  );
                },
              },
            ]}
          />
          <IconButton
            sx={{ p: 2 }}
            onClick={(e) => {
              setDateFilterClick(false);
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Modal>
    </GridToolbarContainer>
  );
};

export default CustomWarningToolbar;
