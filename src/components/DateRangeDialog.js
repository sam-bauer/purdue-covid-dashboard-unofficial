import React from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  TextField,
  ButtonGroup,
  Button
} from "@mui/material";
import { LocalizationProvider, DateRangePicker } from "@mui/lab";
import MomentUtils from "@mui/lab/AdapterMoment";

export default function DateRangeDialog(props) {
  const { setDateRangeDialog, setDateRange, open, minDate, maxDate } = props;
  const [value, setValue] = React.useState([minDate, maxDate]);

  const handleClose = () => {
    setDateRangeDialog(false);
  };

  const handleDateRangeChange = (dates) => {
    setValue(dates);
    setDateRange(dates);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Change date range</DialogTitle>
      <LocalizationProvider dateAdapter={MomentUtils}>
        <DateRangePicker
          startText="Start date"
          endText="End date"
          value={value}
          maxDate={maxDate}
          minDate={minDate}
          onChange={(newValue) => {
            handleDateRangeChange(newValue);
          }}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <TextField {...startProps} sx={{ ml: 2 }} />
              <Box sx={{ mx: 2 }}> to </Box>
              <TextField {...endProps} sx={{ mr: 2 }} />
            </React.Fragment>
          )}
        />
      </LocalizationProvider>
      <ButtonGroup sx={{ m: 2 }}>
        <Button onClick={() => handleDateRangeChange([minDate, maxDate])}>
          All Time
        </Button>
        <Button
          onClick={() =>
            handleDateRangeChange([
              maxDate.clone().subtract(90, "days"),
              maxDate
            ])
          }
        >
          Last 90 Days
        </Button>
        <Button
          onClick={() =>
            handleDateRangeChange([
              maxDate.clone().subtract(30, "days"),
              maxDate
            ])
          }
        >
          Last 30 Days
        </Button>
      </ButtonGroup>
    </Dialog>
  );
}
