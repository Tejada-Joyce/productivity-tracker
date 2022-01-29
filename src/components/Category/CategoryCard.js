import Categorylist from "./CategoryList";
import styles from "./CategoryCard.module.css";

const CategoryCard = (props) => {
  console.log(props);
  return (
    <div className={styles.categoryCard}>
      <h3>{props.date}</h3>
      <Categorylist activityList={props.list} />
    </div>
  );
};

export default CategoryCard;
