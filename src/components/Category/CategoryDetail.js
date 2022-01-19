import styles from "./CategoryDetail.module.css"

const CategoryDetail = (props) => {
    return props.activityList.map((activity, key) => {
        return ( 
            <div className={styles.categoryDetail} key={key}>
                <div>
                    <span>{activity.name}</span>
                </div>
                <div>
                    <span>{activity.hours} Hr</span>
                </div>
            </div>
        );
    })
}

export default CategoryDetail;