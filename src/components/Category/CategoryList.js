import CategoryDetail from "./CategoryDetail";

const CategoryList = (props) => {
  return (
    <div>
      <CategoryDetail activityList={props.activityList} />
    </div>
  );
};

export default CategoryList;
