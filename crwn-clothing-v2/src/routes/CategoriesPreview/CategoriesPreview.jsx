import { Fragment } from "react";
import { useSelector } from "react-redux";

import {selectCategoriesMap} from '../../store/categories/categorySelector'

//import { CategoriesContext } from "../../context/CategoriesContext";
import CategoryPreview from "../../components/CategoryPreview/CategoryPreview";

const CategoriesPreview = () =>{

    //const { categoriesMap } = useContext(CategoriesContext)
    const categoriesMap = useSelector(selectCategoriesMap);
    return (
        <Fragment>
            {Object.keys(categoriesMap).map((title) => {
                const products = categoriesMap[title]
                return(
                    <CategoryPreview key={title} title={title} products={products} />
                )
            })
            }
        </Fragment>
    )

}
export default CategoriesPreview