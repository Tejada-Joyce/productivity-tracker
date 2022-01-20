import "./CategoriesList.css";

const CategoriesList = ({ categories, chosenCategory, onSaveCategory }) => {
  const categoryChangeHandler = (e) => {
    onSaveCategory(e.target.value);
  };
  return (
    <>
      <input
        list="categories"
        name="category"
        id="category"
        value={chosenCategory}
        onChange={categoryChangeHandler}
        placeholder="Choose a Category or Type a New One"
        required
      />
      <datalist id="categories">
        <option value="">Choose a Category</option>
        {categories &&
          categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
      </datalist>
      {/* <select value={chosenCategory} onChange={categoryChangeHandler} required>
      
      <option value="">Choose a Category</option>
      {categories &&
        categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
    </select> */}
    </>
  );
};

export default CategoriesList;
