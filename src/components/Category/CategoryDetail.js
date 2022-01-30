import styles from "./CategoryDetail.module.css";
import { useNavigate } from 'react-router-dom';
import { config } from "../../firebaseConfig";

const convertToJson = async (res) => {
  if (res.ok) {
    return res.json();
  } else {
    // eslint-disable-next-line no-throw-literal
    throw { name: "servicesError", message: await res.json() };
  }
};

const CategoryDetail = (props) => {
  let navigate = useNavigate();
  const activitiesServer = `${config.db}activities`;

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

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this activity?")) {
      await deleteData(`${activitiesServer}/${id}.json`);
      navigate(0);
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
