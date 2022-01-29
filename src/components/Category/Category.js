import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import CategoryCard from "./CategoryCard";
import CatergoryDropDown from "./CatergoryDropDown";
import { Link } from "react-router-dom";
import styles from "./Category.module.css";

import { config } from "../../firebaseConfig";
import moment from "moment";

const Category = () => {
  //Get the parameters passed on the routes
  const { category_type } = useParams();

  //Create the fetch when data is available*/
  const fireBaseServer = `${config.db}activities.json`;
  const [dataReceived, setdataReceived] = useState([]);

  const fetchActivitiesHandler = useCallback(async () => {
    try {
      const response = await fetch(fireBaseServer);
      const data = await response.json();

      const dataLoaded = [];
      for (const key in data) {
        dataLoaded.push({ ...data[key], id: key });
      }
      //   console.log(dataLoaded);

      setdataReceived(dataLoaded);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchActivitiesHandler();
  }, [fetchActivitiesHandler]);

  //Filter the content based on category_type
  const categoryData = dataReceived.filter(
    (entry) => entry.category === category_type
  );

  //Calculate the hour
  const getHourDifference = (dateFuture, dateNow) => {
    return ((dateFuture - dateNow) / 1000 / 3600) % 24;
  };

  //Hold the content based on date
  const groupByDateCategory = new Map();

  //Group the content based on the date with name and hours
  categoryData
    .sort((a, b) => {
      let bStart = moment(b.startTime);
      let aStart = moment(a.startTime);

      return aStart.valueOf() - bStart.valueOf();
    })
    .forEach((entry) => {
      let momentFormat = "dddd, MMM Do yyyy";
      let date = moment(entry.startTime);

      if (!groupByDateCategory.has(date.format(momentFormat))) {
        groupByDateCategory.set(date.format(momentFormat), [
          {
            name: entry.name,
            hours: getHourDifference(moment(entry.endTime), date),
            id: entry.id,
          },
        ]);
      } else {
        groupByDateCategory.set(date.format(momentFormat), [
          ...groupByDateCategory.get(date.format(momentFormat)),
          {
            name: entry.name,
            hours: getHourDifference(moment(entry.endTime), date),
            id: entry.id,
          },
        ]);
      }
    });

  //Pass the content to category dynamically to display multiple cards by date
  let categoryList = <span>No Activity Listed!</span>;

  if (groupByDateCategory.size > 0) {
    categoryList = [];
    groupByDateCategory.forEach((values, key) => {
      categoryList.unshift(
        <CategoryCard key={key} date={key} list={values}></CategoryCard>
      );
    });
  }

  return (
    <div className={styles.categoryDisplay}>
      <h1>{category_type}</h1>
      <div className={styles.categoryOptions}>
        <CatergoryDropDown />
        <Link
          to="/addActivities"
          state={{ from: `${category_type}` }}
          className={styles.categoryAdd}
        >
          Add New
        </Link>
      </div>
      {categoryList}
    </div>
  );
};

export default Category;
