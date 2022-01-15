import { PieChart } from 'react-minimal-pie-chart';
import { useState } from 'react';

const Home = () => {
    const userData = require('../../productivity-data.json');
    const [startDate, setStartDate] = useState(new Date());

    const changeDateHandler = (event) => {
        if (event.target.value === 'true') {
            setStartDate(prevState => {
                let d = new Date(prevState);
                d.setDate(d.getDate() + 1);
                return d;
            });
        } else if (event.target.value === 'false') {
            setStartDate(prevState => {
                let d = new Date(prevState);
                d.setDate(d.getDate() - 1);
                return d;
            });
        }
    };

    const transformUserData = (categories, activities, startDate, endDate = null) => {
        return categories.map(cat => {
            // get total minutes for each activity in current category
            let totalMinutes = activities.reduce((sum, act) => {
                if (act.category !== cat.name) return sum; // filter out other categories
                // filter out other days

                let start = new Date(act.startTime);
                let end = new Date(act.endTime);
                let diffMs = (end - start); // milliseconds between startTime and endTime
                let diffMins = Math.floor((diffMs/1000)/60); // transform to minutes
                return sum + diffMins; // add to accumulator
            }, 0);
    
            return {
                key: cat.name,
                value: totalMinutes,
                color: cat.hex
            }
        });
    };

    return (<>
        <div>
            <button onClick={changeDateHandler} value={false}>&#8592;</button>
            <input type='text' value={startDate.toDateString()} disabled />
            <button onClick={changeDateHandler} value={true}>&#8594;</button>
        </div>
        <PieChart
            animate
            animationDuration={500}
            animationEasing="ease-out"
            center={[50, 50]}
            data={transformUserData(userData.categories, userData.activities, startDate)}
            radius={20}
            label={({dataEntry}) => `${dataEntry.key} - ${Math.round(dataEntry.percentage)}%`}
            labelPosition={70}
            labelStyle={{fontSize: "1.5px"}}
        />
    </>);
}

export default Home;