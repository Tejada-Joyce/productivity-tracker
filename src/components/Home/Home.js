import { PieChart } from 'react-minimal-pie-chart';



const Home = () => {
    const userData = require('../../productivity-data.json');
    const transformUserData = (categories, activities) => {
        return categories.map(cat => {
            // get total minutes for each activity in current category
            let totalMinutes = activities.filter(act => act.category === cat.name)
                .reduce((sum, act) => {
                    console.log(act);
                    
                    let start = new Date(act.startTime);
                    let end = new Date(act.endTime);
                    let diffMs = (end - start); // milliseconds between startTime and endTime
                    console.log(diffMs);
                    let diffMins = Math.floor((diffMs/1000)/60); // transform to minutes
                    console.log(diffMins);
                    return sum + diffMins; // add to accumulator
                }, 0);

            console.log(`${cat.name} - ${totalMinutes}`);
    
            return {
                key: cat.name,
                value: totalMinutes,
                color: cat.hex
            }
        });
    };
    return <PieChart
        animate
        animationDuration={500}
        animationEasing="ease-out"
        center={[50, 50]}
        data={transformUserData(userData.categories, userData.activities)}
        radius={20}
        label={({dataEntry}) => `${dataEntry.key} - ${Math.round(dataEntry.percentage)}%`}
        labelPosition={70}
        labelStyle={{fontSize: "1.5px"}}
    />;
}

export default Home;