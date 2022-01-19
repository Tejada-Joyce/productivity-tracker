import { PieChart } from 'react-minimal-pie-chart';
import { useState } from 'react';
import DatePicker from './DatePicker';
import moment from 'moment';

import styles from './Home.module.css';

const Home = () => {
    const userData = require('../../productivity-data.json');
    const [startDate, setStartDate] = useState(moment());
    // const [endDate, setEndDate] = useState(null);

    const changeDateHandler = (event) => {
        if (event.target.value === 'true' && !moment().isSame(startDate, 'day')) {
            setStartDate(prevState => moment(prevState).add(1, 'd'));
        } else if (event.target.value === 'false') {
            setStartDate(prevState => moment(prevState).subtract(1, 'd'));
        }
    };

    const transformUserData = (categories, activities, startDate, endDate = null) => {
        return categories.map(cat => {
            // get total minutes for each activity in current category between startDate & endDate
            let totalMinutes = activities.reduce((sum, act) => {
                if (act.category !== cat.name) return sum; // filter out other categories
                
                let start = moment(act.startTime);
                let end = moment(act.endTime);

                // filter out other days
                if (!startDate.isSame(start, 'day') && !startDate.isSame(end, 'day')) return sum;

                // else add minutes to accumulator
                let diffMins = start.diff(end, 'minutes');
                return sum + diffMins;
            }, 0);

    
            return {
                key: cat.name,
                value: totalMinutes,
                color: cat.hex
            }
        });
    };

    return (<div>
        <div className={styles.PieContainer}>
            <DatePicker
                clickHandler={changeDateHandler}
                date={moment().isSame(startDate, 'd') ? `Today, ${startDate.format("MMM Do")}` : startDate.format("dddd, MMM Do")}
            />
            <PieChart
                className={styles.PieContainer__Pie}
                animate
                animationDuration={500}
                animationEasing="ease-out"
                data={transformUserData(userData.categories, userData.activities, startDate)}
                radius={46}
                label={({dataEntry}) => dataEntry.percentage === 0 ? "" : `${Math.round(dataEntry.percentage)}%`}
                labelPosition={70}
                labelStyle={{fontSize: "3px"}}
            />
        </div>
        <ul className={styles.DetailList}>
            {transformUserData(userData.categories, userData.activities, startDate).map(row => {
                let time = row.value === 0 ? '' : <span>{moment.duration(row.value, 'minutes').humanize()}</span>;
                let link = <a className={styles.DetailList__Link} href={`/category/${row.key}`} style={{backgroundColor: row.color}}>{row.key}</a>;
                return (<li className={styles.DetailList__Item}>{link} - {time}</li>);
            })}
        </ul>
    </div>);
}

export default Home;