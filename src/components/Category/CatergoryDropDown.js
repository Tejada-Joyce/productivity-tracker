import { Link } from "react-router-dom";

const Category = ({ match, location }) => {
    //Create the list of links to be added to the drop down menu with proper parms
    const categories = ['Work', 'Exercise', 'Social Media', 'Entertainment', 'School'].map((categorie, key) => {
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