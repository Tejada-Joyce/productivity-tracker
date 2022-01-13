import { Link } from "react-router-dom";

const Navigation = () => {
    return (
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/">Categories</Link>
            </li>
            <li>
              <Link to="/addActivities">Add Activity</Link>
            </li>
          </ul>
        </nav>
    )
  };
  
  export default Navigation;