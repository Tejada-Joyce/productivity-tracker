import styles from "./CategoryDetail.module.css"

const CategoryDetail = (props) => {
    return (
        <div className={styles.categoryDetail}>
            <div>
                <span>Activity One</span>
            </div>
            <div>
                <span>1 hr</span>
            </div>
        </div>
    );
}

export default CategoryDetail;