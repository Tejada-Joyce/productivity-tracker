import DateTimePicker from "@mui/lab/DateTimePicker";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import * as React from "react";

const TimeItem = ({ label, value, onChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        disableFuture
        renderInput={(props) => <TextField {...props} />}
        label={label}
        value={value}
        onChange={onChange}
      />
    </LocalizationProvider>
  );
};

export default TimeItem;
