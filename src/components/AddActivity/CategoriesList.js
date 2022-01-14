const CategoriesList = ({ categories }) => {
  return (
    <select>
      <option>Choose a Category</option>
      {categories.map((category) => (
        <option key={category.id} value={category.name}>
          {category.name}
        </option>
      ))}
    </select>
  );
};

export default CategoriesList;
