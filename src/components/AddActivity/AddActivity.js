import { useState } from "react";
import { config } from "../../firebaseConfig";
import CategoriesList from "./CategoriesList";
import TimeItem from "./TimeItem";
import "./AddActivity.css";
import Stack from "@mui/material/Stack";
import useFetch from "../../helper/useFetch";

const convertToJson = async (res) => {
  if (res.ok) {
    return res.json();
  } else {
    throw { name: "servicesError", message: await res.json() };
  }
};

const postData = async (url, sentData) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sentData),
  };
  const response = await fetch(url, options).then(convertToJson);
  console.log(response);
  return response;
};

const AddActivities = () => {
  const [errorMessage, setErrorMessage] = useState();
  const [chosenCategory, setChosenCategory] = useState("");
  const [enteredActivity, setEnteredActivity] = useState("");
  const [enteredStartTime, setEnteredStartTime] = useState(new Date());
  const [enteredEndTime, setEntereEndTime] = useState(new Date());

  //Create the fetch when data is available*/
  const fireBaseServer = `${config.db}categories.json`;
  const activitiesServer = `${config.db}activities.json`;

  const { dataReceived, error } = useFetch(fireBaseServer);

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

  const addActivityHandler = async (e) => {
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
      category: chosenCategory,
      endTime: enteredEndTime,
      name: enteredActivity,
      startTime: enteredStartTime,
    };

    const response = await postData(activitiesServer, newActivity);
    console.log(response);
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
          {error && <div>{error}</div>}
          <CategoriesList
            categories={dataReceived}
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
