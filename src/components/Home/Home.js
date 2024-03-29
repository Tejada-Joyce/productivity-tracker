import { PieChart } from "react-minimal-pie-chart";
import { useState, useEffect, useCallback } from "react";
import DatePicker from "./DatePicker";
import { Link } from "react-router-dom";
import moment from "moment";
import { config } from "../../firebaseConfig";

import styles from "./Home.module.css";

const Home = () => {
  const [startDate, setStartDate] = useState(moment());

  const [userActivities, setUserActivities] = useState([]);
  const [userCategories, setUserCategories] = useState([]);
  const activityUrl = `${config.db}activities.json`;
  const categoryUrl = `${config.db}categories.json`;

  const hexList = require("./HexColors.json");

  const fetchActivitiesHandler = useCallback(async () => {
    try {
      const activityRes = await fetch(activityUrl);
      const activityData = await activityRes.json();

      const activitiesLoaded = Object.keys(activityData).map((k) => {
        // console.log(activityData[k]);
        // console.log(moment(activityData[k].startTime).format());
        return activityData[k];
      });
      setUserActivities(activitiesLoaded);

      const categoryRes = await fetch(categoryUrl);
      // set to json data, if null set to default list
      const categoryData = (await categoryRes.json()) ?? {
        1: "Work",
        2: "Exercise",
        3: "Social Media",
        4: "School",
        5: "Entertainment",
      };

      const categoriesLoaded = Object.keys(categoryData).map((k, i) => {
        return {
          name: categoryData[k],
          hex: hexList[i],
        };
      });
      setUserCategories(categoriesLoaded);
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    fetchActivitiesHandler();
  }, [fetchActivitiesHandler]);

  const changeDateHandler = (event) => {
    if (event.target.value === "true" && !moment().isSame(startDate, "day")) {
      setStartDate((prevState) => moment(prevState).add(1, "d"));
    } else if (event.target.value === "false") {
      setStartDate((prevState) => moment(prevState).subtract(1, "d"));
    }
  };

  const transformUserData = (
    categories,
    activities,
    startDate,
    endDate = null
  ) => {
    return categories.map((cat) => {
      // get total minutes for each activity in current category between startDate & endDate
      let totalMinutes = activities.reduce((sum, act) => {
        if (act.category !== cat.name) return sum; // filter out other categories

        let start = moment(act.startTime);
        let end = moment(act.endTime);

        // filter out other days
        if (!startDate.isSame(start, "day") && !startDate.isSame(end, "day"))
          return sum;

        // else add minutes to accumulator
        let diffMins = start.diff(end, "minutes");
        return sum + diffMins;
      }, 0);

      return {
        key: cat.name,
        value: totalMinutes,
        color: cat.hex,
      };
    });
  };

  return (
    <div className={styles.homeLayout}>
      <div className={styles.pieContainer}>
        <DatePicker
          clickHandler={changeDateHandler}
          date={
            moment().isSame(startDate, "d")
              ? `Today, ${startDate.format("MMM Do")}`
              : startDate.format("dddd, MMM Do")
          }
        />
        <PieChart
          className={styles.pieContainer__pie}
          animate
          animationDuration={500}
          animationEasing="ease-out"
          background="#eeeeee"
          data={transformUserData(userCategories, userActivities, startDate)}
          radius={48}
          label={({ dataEntry }) =>
            dataEntry.percentage === 0
              ? ""
              : `${Math.round(dataEntry.percentage)}%`
          }
          labelPosition={70}
          labelStyle={{ fontSize: "3px" }}
        />
      </div>
      <ul className={styles.detailList}>
        {transformUserData(userCategories, userActivities, startDate).map(
          (row, index) => {
            let time =
              row.value === 0 ? (
                <span>{"0 hours"}</span>
              ) : (
                <span>{moment.duration(row.value, "minutes").humanize()}</span>
              );
            let link = (
              <Link
                className={styles.detailList__link}
                to={`/category/${row.key}`}
                style={{ backgroundColor: row.color }}
              >
                {row.key}
              </Link>
            );
            return (
              <li key={index} className={styles.detailList__item}>
                {link} - {time}
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
};

export default Home;
