import CategoryDetail from "./CategoryDetail";
import styles from "./CategoryList.module.css"

const CategoryCard = (props) => {
    console.log(props.activityList)
    return (
        <div className={styles.categoryList}>
            <CategoryDetail />
        </div>
    );
}

export default CategoryCard;