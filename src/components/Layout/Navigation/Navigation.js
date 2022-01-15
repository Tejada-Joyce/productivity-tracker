import { Link } from "react-router-dom";
import CatergoryDropDown from "../../Category/CatergoryDropDown"

const Navigation = () => {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="nav-link" to="/">OurAppLogo</Link>
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
                    <CatergoryDropDown />
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
