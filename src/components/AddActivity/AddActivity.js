import { createRef, useRef, useState } from "react";
import { config } from "../../firebaseConfig";
import CategoriesList from "./CategoriesList";
import TimeItem from "./TimeItem";
import styles from "./AddActivity.module.css";
import Stack from "@mui/material/Stack";
import useFetch from "../../helper/useFetch";
import { useNavigate } from "react-router";
import moment from "moment";
import { useLocation } from "react-router-dom";

const convertToJson = async (res) => {
  if (res.ok) {
    return res.json();
  } else {
    // eslint-disable-next-line no-throw-literal
    throw { name: "servicesError", message: await res.json() };
  }
};

const postData = async (url, sentData) => {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sentData),
    };
    const response = await fetch(url, options).then(convertToJson);
    return response;
  } catch (err) {
    console.log(err);
  }
};

const AddActivities = () => {
  const location = useLocation();
  const { from } = location.state || false;
  const [errorMessage, setErrorMessage] = useState();
  const [chosenCategory, setChosenCategory] = useState(from || "");
  const [enteredActivity, setEnteredActivity] = useState("");
  const [enteredStartDate, setEnteredStartDate] = useState(moment());
  const [startTime, setStartTime] = useState(moment());
  const [endTime, setEndTime] = useState(moment());
  const timeRef = createRef();
  const categoryRef = createRef();
  const activityRef = useRef();

  const navigate = useNavigate();

  //Create the fetch when data is available
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
    setEnteredStartDate(moment(newValue));
  };

  const startTimeChangeHandler = (newValue) => {
    setStartTime(moment(newValue));
  };

  const endTimeChangeHandler = (newValue) => {
    setEndTime(moment(newValue));
  };

  const addActivityHandler = async (e) => {
    e.preventDefault();
    if (
      !chosenCategory ||
      chosenCategory.trim().length === 0 ||
      enteredActivity.trim().length === 0
    ) {
      setErrorMessage("Please fill out all fields.");
      if (!chosenCategory || chosenCategory.trim().length === 0) {
        categoryRef.current.focus();
      } else {
        activityRef.current.focus();
      }
      return;
    }

    if (!endTime || !enteredStartDate) {
      setErrorMessage("Time error. Please try again.");
      return;
    }

    if (endTime <= startTime) {
      setErrorMessage("Please enter a valid start time.");
      timeRef.current.focus();
      return;
    }

    let startTimeString = moment()
      .set({
        year: enteredStartDate.year(),
        month: enteredStartDate.month(),
        date: enteredStartDate.date(),
        hour: startTime.hour(),
        minute: startTime.minute(),
        second: startTime.second(),
        millisecond: startTime.millisecond(),
      })
      .format();

    let endTimeString = moment()
      .set({
        year: enteredStartDate.year(),
        month: enteredStartDate.month(),
        date: enteredStartDate.date(),
        hour: endTime.hour(),
        minute: endTime.minute(),
        second: endTime.second(),
        millisecond: endTime.millisecond(),
      })
      .format();

    const newActivity = {
      category: chosenCategory,
      endTime: endTimeString,
      name: enteredActivity,
      startTime: startTimeString,
    };

    await postData(activitiesServer, newActivity);

    if (!categories.includes(chosenCategory)) {
      await postData(categoriesServer, chosenCategory);
    }

    setErrorMessage();
    setChosenCategory("");
    setEnteredActivity("");
    setEnteredStartDate(moment());
    setStartTime(moment());
    setEndTime(moment());
    // categoryRef.current.focus();
    navigate(`/category/${chosenCategory}`);
  };

  return (
    <div className={styles.container}>
      <div>
        <h1>Add Activity</h1>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
      <form onSubmit={addActivityHandler}>
        <Stack spacing={2} className={styles.stack_container}>
          {error && <div>{error}</div>}
          <CategoriesList
            categories={categories}
            chosenCategory={chosenCategory}
            onSaveCategory={saveCategoryHandler}
            ref={categoryRef}
          />
          <input
            ref={activityRef}
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
            ref={timeRef}
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
