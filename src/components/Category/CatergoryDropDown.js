import { Link } from "react-router-dom";
import {config} from '../../firebaseConfig';
import { useState, useEffect, useCallback } from "react";

const Category = ({ match, location }) => {
    
    //Fetch Category
    const fireBaseServer  = `${config.db}categories.json`;
    const [dataReceived, setdataReceived] = useState([]);
    
    const fetchActivitiesHandler = useCallback(async () => {
        try {
            const response = await fetch(fireBaseServer);
            const data = await response.json();
            const dataLoaded = []
            for (const key in data) {
                dataLoaded.push(data[key]);
            }

            setdataReceived(dataLoaded);
        } catch (error) {
            console.log(error);
        }
    }, [])

    useEffect(() => {
        fetchActivitiesHandler();
    }, [fetchActivitiesHandler]);

    //Create the list of links to be added to the drop down menu with proper parms
    const categories = dataReceived.map((categorie, key) => {
        return (
            <Link className="dropdown-item" to={'/category/' + categorie} key={key}>{categorie}</Link>
        )
    });
    
    return (
        <div className="nav-item dropdown">
            <div className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Categories
            </div>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                {categories}
            </div>
        </div>
    );
}

export default Category;