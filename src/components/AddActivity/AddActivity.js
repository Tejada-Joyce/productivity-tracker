import categories from "../../data/categories.json";
import CategoriesList from "./CategoriesList";
import TimeItem from "./TimeItem";
import "./AddActivity.css";
import { useState } from "react";
import Stack from "@mui/material/Stack";

const AddActivities = () => {
  const [errorMessage, setErrorMessage] = useState();
  const [chosenCategory, setChosenCategory] = useState("");
  const [enteredActivity, setEnteredActivity] = useState("");
  const [enteredStartTime, setEnteredStartTime] = useState(new Date());
  const [enteredEndTime, setEntereEndTime] = useState(new Date());

  const saveCategoryHandler = (chosenCategory) => {
    setChosenCategory(chosenCategory);
  };

  const activityChangeHandler = (e) => {
    setEnteredActivity(e.target.value);
  };

  const startTimeChangeHandler = (newValue) => {
    setEnteredStartTime(newValue);
  };

  const endTimeChangeHandler = (newValue) => {
    setEntereEndTime(newValue);
  };

  const addActivityHandler = (e) => {
    e.preventDefault();
    if (!chosenCategory || enteredActivity.trim().length === 0) {
      setErrorMessage("Please fill out all fields.");
      return;
    }

    if (enteredEndTime <= enteredStartTime) {
      setErrorMessage("Please enter a valid time.");
      return;
    }

    const newActivity = {
      name: enteredActivity,
      category: chosenCategory,
      startTime: enteredStartTime,
      endTime: enteredEndTime,
    };
    console.log(newActivity);
    setErrorMessage();
    setChosenCategory("");
    setEnteredActivity("");
    setEnteredStartTime(new Date());
    setEntereEndTime(new Date());
  };

  return (
    <div className="container">
      <h1>Add Activity</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={addActivityHandler}>
        <Stack spacing={2} className="stack_container">
          <CategoriesList
            categories={categories}
            chosenCategory={chosenCategory}
            onSaveCategory={saveCategoryHandler}
          />
          <input
            value={enteredActivity}
            placeholder="Activity Name"
            onChange={activityChangeHandler}
            required
          />
          <TimeItem
            label="Start Date/Time"
            value={enteredStartTime}
            onChange={startTimeChangeHandler}
          />
          <TimeItem
            label="End Date/Time"
            value={enteredEndTime}
            onChange={endTimeChangeHandler}
          />
          {/* <label htmlFor="birthdaytime">Birthday (date and time):</label>
        <input
        type="datetime-local"
        id="birthdaytime"
        name="birthdaytime"
      />*/}
          <button type="submit">Add</button>
        </Stack>
      </form>
    </div>
  );
};

export default AddActivities;
