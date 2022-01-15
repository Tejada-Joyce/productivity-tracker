import { useParams } from "react-router-dom";

const Category = ({ match, location }) => {
    const { category_type } = useParams();

    return (
        <h1>{category_type}</h1>
    );
}

export default Category;