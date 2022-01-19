import CategoryDetail from "./CategoryDetail";
import styles from "./CategoryList.module.css"

const CategoryCard = (props) => {
    return (
        <div className={styles.categoryList}>
            <CategoryDetail activityList={props.activityList}/>
        </div>
    );
}

export default CategoryCard;