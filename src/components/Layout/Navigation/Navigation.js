import { Link } from "react-router-dom";

const Navigation = () => {
    return (
        <nav className="navbar navbar-expand-sm bg-dark">
            <Link className="nav-link" to="/">OurAppLogo</Link>
            <div className="collapse navbar-collapse justify-content-end">
              <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                  </li>
                  <li className="nav-item">
                  <Link className="nav-link" to="/">Categories</Link>
                  </li>
                  <li className="nav-item">
                  <Link className="nav-link" to="/addActivities">Add Activity</Link>
                  </li>
                </ul>
            </div>
        </nav>
    )
  };
  
  export default Navigation;