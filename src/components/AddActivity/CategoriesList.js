import { forwardRef } from "react";

const CategoriesList = forwardRef(
  ({ categories, chosenCategory, onSaveCategory }, ref) => {
    const categoryChangeHandler = (e) => {
      onSaveCategory(e.target.value);
    };
    return (
      <>
        <input
          ref={ref}
          list="categories"
          name="category"
          id="category"
          value={chosenCategory}
          onChange={categoryChangeHandler}
          placeholder="Choose a Category or Type a New One"
          required
        />
        <datalist id="categories">
          {categories &&
            categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
        </datalist>
      </>
    );
  }
);

export default CategoriesList;
