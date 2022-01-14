import { Link } from "react-router-dom";

const Navigation = () => {
    //Create the list of links to be added to the drop down menu with proper parms
    const categories = ['Work', 'Exercise', 'Social Media', 'Entertainment', 'School'].map((categorie, key) => {
        return (
            <Link className="dropdown-item" to={'/category/'+ (categorie.charAt(0).toLowerCase()) +
            categorie.slice(1).replace(/\s/g, '')} key={key}>{categorie}</Link>
        )

        // 
    });

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="nav-link" to="/">
        OurAppLogo
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        >
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
            <li>
                <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item dropdown">
                <div className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Categories
                </div>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
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
