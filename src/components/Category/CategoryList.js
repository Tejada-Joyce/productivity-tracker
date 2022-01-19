import CategoryDetail from "./CategoryDetail";

const CategoryCard = (props) => {
    return (
        <div>
            <CategoryDetail activityList={props.activityList}/>
        </div>
    );
}

export default CategoryCard;