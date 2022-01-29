import styles from "./CategoryDetail.module.css";
import { config } from "../../firebaseConfig";
import { useEffect } from "react";

const convertToJson = async (res) => {
  if (res.ok) {
    return res.json();
  } else {
    // eslint-disable-next-line no-throw-literal
    throw { name: "servicesError", message: await res.json() };
  }
};

const deleteData = async (url) => {
  try {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, options).then(convertToJson);
    return response;
  } catch (err) {
    console.log(err);
  }
};

const CategoryDetail = (props) => {
  const activitiesServer = `${config.db}activities`;

  const deleteHandler = async (id) => {
    console.log(id, "was clicked");
    if (window.confirm("Are you sure you want to delete this activity?")) {
      const response = await deleteData(`${activitiesServer}/${id}.json`);
      console.log(response);
    }
  };

  return props.activityList.map((activity, key) => {
    return (
      <div className={styles.categoryDetail} key={key}>
        <div>
          <span>{activity.name}</span>
        </div>
        <div>
          <span>{parseFloat(activity.hours).toFixed(1)} Hr</span>
        </div>
        <i
          className="fa fa-trash-o"
          onClick={() => deleteHandler(activity.id)}
        ></i>
      </div>
    );
  });
};

export default CategoryDetail;
