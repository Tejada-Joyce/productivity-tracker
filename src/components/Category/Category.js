import { useParams } from "react-router-dom";
import CategoryDropDown from "./CatergoryDropDown"

const Category = ({ match, location }) => {
    const { category_type } = useParams();

    return (
        <>
        <h1>{category_type}</h1>
        <CategoryDropDown />
        </>
    );
}

export default Category;