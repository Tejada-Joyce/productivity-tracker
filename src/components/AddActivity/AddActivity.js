import { useState } from "react";
import { config } from "../../firebaseConfig";
import CategoriesList from "./CategoriesList";
import TimeItem from "./TimeItem";
import styles from "./AddActivity.module.css";
import Stack from "@mui/material/Stack";
import useFetch from "../../helper/useFetch";
// import { useNavigate } from "react-router";

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
  // const navigate = useNavigate();

  //Create the fetch when data is available*/
  const categoriesServer = `${config.db}categories.json`;
  const activitiesServer = `${config.db}activities.json`;

  const { dataReceived, error } = useFetch(categoriesServer);

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

    // if (!dataReceived.includes(chosenCategory)) {
    //   const newCategory = {
    //     category: chosenCategory,
    //   };
    //   const catResponse = await postData(categoriesServer, newCategory);
    //   console.log(catResponse);
    // }

    setErrorMessage();
    setChosenCategory("");
    setEnteredActivity("");
    setEnteredStartTime(new Date());
    setEntereEndTime(new Date());
    // navigate(`/category/${chosenCategory}/`);
  };

  return (
    <div className={styles.container}>
      <h1>Add Activity</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={addActivityHandler}>
        <Stack spacing={2} className={styles.stack_container}>
          {error && <div>{error}</div>}
          <CategoriesList
            categories={dataReceived}
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
            label="Start Date/Time"
            value={enteredStartTime}
            onChange={startTimeChangeHandler}
          />
          <TimeItem
            label="End Date/Time"
            value={enteredEndTime}
            onChange={endTimeChangeHandler}
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
