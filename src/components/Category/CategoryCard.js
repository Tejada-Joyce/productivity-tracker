import Categorylist from "./CategoryList"
import styles from "./CategoryCard.module.css"

const CategoryCard = (props) => {
    return (
        <div className={styles.categoryCard}>
            <h3>Jan 12, 2022</h3>
            <Categorylist />
        </div>
    );
}

export default CategoryCard;