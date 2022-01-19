import styles from "./CategoryDetail.module.css"

const CategoryDetail = (props) => {
    //List of details
   const activityList = props.activityList.map(activity => {
        return ( 
            <div className={styles.categoryDetail}>
                <div>
                    <span>{activity.name}</span>
                </div>
                <div>
                    <span>{activity.hours}</span>
                </div>
            </div>
        );
    })

    return props.activityList.map((activity, key) => {
        return ( 
            <div className={styles.categoryDetail} key={key}>
                <div>
                    <span>{activity.name}</span>
                </div>
                <div>
                    <span>{activity.hours}</span>
                </div>
            </div>
        );
    })
}

export default CategoryDetail;