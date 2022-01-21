import { useState } from "react";
import { config } from "../../firebaseConfig";
import CategoriesList from "./CategoriesList";
import TimeItem from "./TimeItem";
import styles from "./AddActivity.module.css";
import Stack from "@mui/material/Stack";
import useFetch from "../../helper/useFetch";
// import { useNavigate } from "react-router";

const getTimeDifference = (startT, endT) => {
  const diff = endT.getTime() - startT.getTime();
  return diff;
};

const addMiliSecToDate = (date, milliseconds) => {
  date = new Date(date).getTime();
  const newDate = new Date(milliseconds + date);
  return newDate;
};

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
  const midnightTime = new Date(new Date().setHours(0, 0, 0, 0));
  const [errorMessage, setErrorMessage] = useState();
  const [chosenCategory, setChosenCategory] = useState("");
  const [enteredActivity, setEnteredActivity] = useState("");
  const [enteredStartDate, setEnteredStartDate] = useState(midnightTime);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  // const navigate = useNavigate();

  //Create the fetch when data is available*/
  const categoriesServer = `${config.db}categories.json`;
  const activitiesServer = `${config.db}activities.json`;

  const { dataReceived, error } = useFetch(categoriesServer);
  let categories = [];
  for (const property in dataReceived) {
    categories = [...categories, dataReceived[property]];
  }

  const saveCategoryHandler = (chosenCategory) => {
    setChosenCategory(chosenCategory);
  };

  const activityChangeHandler = (e) => {
    setEnteredActivity(e.target.value);
  };

  const startDateChangeHandler = (newValue) => {
    newValue = new Date(newValue);
    setEnteredStartDate(new Date(newValue.setHours(0, 0, 0, 0)));
  };

  const startTimeChangeHandler = (newValue) => {
    setStartTime(newValue);
  };

  const endTimeChangeHandler = (newValue) => {
    setEndTime(newValue);
  };

  const addActivityHandler = async (e) => {
    e.preventDefault();
    if (!chosenCategory || enteredActivity.trim().length === 0) {
      setErrorMessage("Please fill out all fields.");
      return;
    }

    const duration = getTimeDifference(startTime, endTime);
    const enteredEndTime = addMiliSecToDate(enteredStartDate, duration);

    console.log(enteredEndTime);

    console.log(enteredStartDate);
    if (!enteredEndTime || !enteredStartDate) {
      setErrorMessage("Time error.");
      return;
    }

    if (enteredEndTime <= enteredStartDate) {
      setErrorMessage("Please enter a valid time.");
      return;
    }

    const newActivity = {
      category: chosenCategory,
      endTime: enteredEndTime,
      name: enteredActivity,
      startTime: enteredStartDate,
    };

    const response = await postData(activitiesServer, newActivity);
    console.log(response);

    if (!categories.includes(chosenCategory)) {
      const catResponse = await postData(categoriesServer, chosenCategory);
      // console.log(catResponse);
    }

    setErrorMessage();
    setChosenCategory("");
    setEnteredActivity("");
    setEnteredStartDate(midnightTime);
    setStartTime(new Date());
    setEndTime(new Date());
  };

  return (
    <div className={styles.container}>
      <h1>Add Activity</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={addActivityHandler}>
        <Stack spacing={2} className={styles.stack_container}>
          {error && <div>{error}</div>}
          <CategoriesList
            categories={categories}
            chosenCategory={chosenCategory}
            onSaveCategory={saveCategoryHandler}
          />
          <input
            className={styles.input}
            value={enteredActivity}
            placeholder="Activity Name"
            onChange={activityChangeHandler}
            required
          />
          <TimeItem
            enteredStartDate={enteredStartDate}
            startTime={startTime}
            endTime={endTime}
            startDateChangeHandler={startDateChangeHandler}
            startTimeChangeHandler={startTimeChangeHandler}
            endTimeChangeHandler={endTimeChangeHandler}
          />

          <button className={styles.button} type="submit">
            Add
          </button>
        </Stack>
      </form>
    </div>
  );
};

export default AddActivities;
