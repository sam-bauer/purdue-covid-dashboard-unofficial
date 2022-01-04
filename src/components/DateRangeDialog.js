import React from "react";
import {
  Dialog,
  DialogTitle,
  TextField,
  Box,
  ButtonGroup,
  Button
} from "@mui/material";
import { LocalizationProvider, DateRangePicker } from "@mui/lab";
import MomentUtils from "@mui/lab/AdapterMoment";

export default function DateRangeDialog(props) {
  const { setDateRangeDialog, setDateRange, open, firstDate, lastDate } = props;
  const [value, setValue] = React.useState([firstDate, lastDate]);

  const handleClose = () => {
    setDateRangeDialog(false);
    if (value[0] === null && value[1] === null) {
      setValue([firstDate, lastDate]);
    }
    setDateRange(value);
  };

  return (
    <Dialog onClose={() => handleClose()} open={open}>
      <DialogTitle>Change date range</DialogTitle>
      <LocalizationProvider dateAdapter={MomentUtils}>
        <DateRangePicker
          startText="Start date"
          endText="End date"
          value={value}
          maxDate={lastDate}
          minDate={firstDate}
          onChange={(newValue) => {
            setValue(newValue);
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
        <Button onClick={() => setValue([firstDate, lastDate])}>
          All Time
        </Button>
        <Button
          onClick={() =>
            setValue([lastDate.clone().subtract(30, "days"), lastDate])
          }
        >
          Last 30 Days
        </Button>
        <Button
          onClick={() =>
            setValue([lastDate.clone().subtract(90, "days"), lastDate])
          }
        >
          Last 90 Days
        </Button>
      </ButtonGroup>
    </Dialog>
  );
}
