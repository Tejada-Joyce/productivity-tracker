// import DateTimePicker from "@mui/lab/DateTimePicker";
import DatePicker from "@mui/lab/DatePicker";
import TimePicker from "@mui/lab/TimePicker";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

const TimeItem = ({
  enteredStartDate,
  startTime,
  endTime,
  startDateChangeHandler,
  startTimeChangeHandler,
  endTimeChangeHandler,
}) => {
  // const dateChangeHandler = (newValue) => {
  //   newValue = newValue.setHours(0, 0, 0, 0);
  //   setDate(newValue);
  // };
  // startTimeChangeHandler(date);

  // const duration = getTimeDifference(startTime, endTime);
  // endTimeChangeHandler(addMiliSecToDate(date, duration));

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
};

export default TimeItem;
