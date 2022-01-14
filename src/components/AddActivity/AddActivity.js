import categories from "../../data/categories.json";
import CategoriesList from "./CategoriesList";
import TimeItem from "./TimeItem";
import "./AddActivity.css";

const AddActivities = () => {
  return (
    <div className="container">
      <h1>Add Activity</h1>
      <form>
        <CategoriesList categories={categories} />
        <input placeholder="Activity Name" />
        <TimeItem label="Start Date/Time" />
        <TimeItem label="End Date/Time" />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddActivities;
