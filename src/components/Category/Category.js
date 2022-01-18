import { useParams } from "react-router-dom";
import CategoryDropDown from "./CatergoryDropDown"
import FilteredCategory from "./FilteredCategory";

const Category = ({ match, location }) => {
    const { category_type } = useParams();

    return (
        <>
        <h1>{category_type}</h1>
        <CategoryDropDown />
        <FilteredCategory />
        </>
    );
}

export default Category;