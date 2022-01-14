import { Link } from "react-router-dom";

const Navigation = () => {
    //Create the list of links to be added to the drop down menu
    const categories = ['Work', 'Exercise', 'Social Media', 'Entertainment', 'School'].map((categorie) => {
        return (
            <Link className="dropdown-item" to={'/category?type=' + (categorie.charAt(0).toLowerCase()) + 
                categorie.slice(1).replace(/\s/g, '')}>{categorie}</Link>
        )
    });

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="nav-link" to="/">
        OurAppLogo
        </Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        >
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent" justify-content-end>
        <ul class="navbar-nav ml-auto">
            <li>
                <Link className="nav-link" to="/">Home</Link>
            </li>
            <li class="nav-item dropdown">
                <div class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Categories
                </div>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    {categories}
                </div>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/addActivities">Add Activity</Link>
            </li>
        </ul>
        </div>
    </nav>
  );
};

export default Navigation;
