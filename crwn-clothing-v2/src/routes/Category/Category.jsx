import { useState, useEffect, Fragment } from 'react';
import { useSelector} from "react-redux";
import { useParams } from 'react-router-dom';

//import { CategoriesContext } from '../../context/CategoriesContext';
import {selectCategoriesMap, selectCategoriesIsLoading} from '../../store/categories/categorySelector.js'
import ProductCard from '../../components/ProductCard/ProductCard';
import Spinner from '../../components/Spinner/SpinnerComponent.jsx'

import './Category.scss';

const Category = () =>{
    const {category} = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);
    const [products, setProducts] = useState(categoriesMap[category]);
    
    useEffect(()=>{
        console.log('effect fired calling setProducts')
        setProducts(categoriesMap[category])
    }, [category, categoriesMap])

    return(
        <Fragment>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            {isLoading? (<Spinner></Spinner>) : (
                <div className='category-container'>        
                { products &&
                    products.map((products)=> <ProductCard key={products.id} product={products}/>)
                }
            </div>
            )}            
        </Fragment>
    )

}

export default Category;