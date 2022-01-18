import { useParams } from "react-router-dom";
import CategoryCard from "./CategoryCard";
import DATA from "../../productivity-data.json";

const Category = () => {
    //Get the parameters passed on the routes
    const { category_type } = useParams();

    /*TO DO: 
        Create the fetch when data is available*/
    //Get the productivity data 
    const dataReceived = DATA.activities;
 
    //Filter the content based on category_type
    const categoryData = dataReceived.filter(entry => entry.category === category_type);

    //Calculate the hour
    const getHourDifference = (dateFuture, dateNow) => {
        return (((dateFuture - dateNow) / 1000 / 3600) % 24)
    }

    //Hold the content based on date
    const groupByDateCategory = new Map();

    //Group the content based on the date with name and hours
    categoryData.forEach(entry => {
        let date = new Date(entry.startTime);

        if (!groupByDateCategory.has(date.toDateString())) {
            groupByDateCategory.set(date.toDateString(), [{
                name: entry.name,
                hours: getHourDifference(new Date(entry.endTime), date)
            }])
        } else {
            groupByDateCategory.set(date.toDateString(), 
            [
                ...groupByDateCategory.get(date.toDateString()), 
                {
                    name: entry.name,
                    hours: getHourDifference(new Date(entry.endTime), date)
                }
            ]);
        }
    });

    //Pass the content to category dynamically to display multiple cards by date
    console.log(groupByDateCategory)

    return (
        <>
        <h1>{category_type}</h1>
        <CategoryCard />
        </>
    );
}

export default Category;