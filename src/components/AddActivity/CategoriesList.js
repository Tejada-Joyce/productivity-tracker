import "./CategoriesList.css";

const CategoriesList = ({ categories, chosenCategory, onSaveCategory }) => {
  const categoryChangeHandler = (e) => {
    onSaveCategory(e.target.value);
  };
  return (
    <select value={chosenCategory} onChange={categoryChangeHandler} required>
      <option value="">Choose a Category</option>
      {categories.map((category) => (
        <option key={category.id} value={category.name}>
          {category.name}
        </option>
      ))}
    </select>
  );
};

export default CategoriesList;
