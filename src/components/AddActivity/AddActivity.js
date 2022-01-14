import categories from "../../data/categories.json";
import CategoriesList from "./CategoriesList";
const AddActivities = () => {
  return (
    <div>
      <h1>Add Activities</h1>
      <CategoriesList categories={categories} />
      <input placeholder="Activity Name" />
    </div>
  );
};

export default AddActivities;
