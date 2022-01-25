// import DateTimePicker from "@mui/lab/DateTimePicker";
import DatePicker from "@mui/lab/DatePicker";
import TimePicker from "@mui/lab/TimePicker";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { forwardRef } from "react";

const TimeItem = forwardRef(
  (
    {
      enteredStartDate,
      startTime,
      endTime,
      startDateChangeHandler,
      startTimeChangeHandler,
      endTimeChangeHandler,
    },
    ref
  ) => {
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          disableFuture
          label="Date"
          value={enteredStartDate}
          onChange={startDateChangeHandler}
          renderInput={(params) => (
            <TextField {...params} sx={{ backgroundColor: "white" }} />
          )}
        />
        <TimePicker
          label="Start Time"
          inputRef={ref}
          value={startTime}
          onChange={startTimeChangeHandler}
          renderInput={(params) => (
            <TextField {...params} sx={{ backgroundColor: "white" }} />
          )}
        />
        <TimePicker
          label="End Time"
          value={endTime}
          onChange={endTimeChangeHandler}
          renderInput={(params) => (
            <TextField {...params} sx={{ backgroundColor: "white" }} />
          )}
        />
      </LocalizationProvider>
    );
  }
);

export default TimeItem;
