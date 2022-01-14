import DateTimePicker from "@mui/lab/DateTimePicker";
import TextField from "@mui/material/TextField";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { useState } from "react";

const TimeItem = ({ label }) => {
  const [value, setValue] = useState(new Date());
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <DateTimePicker
        disableFuture
        renderInput={(props) => <TextField {...props} />}
        label={label}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        className="date_time"
      />
    </LocalizationProvider>
  );
};

export default TimeItem;
