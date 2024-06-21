import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import CategoriesPreview from '../CategoriesPreview/CategoriesPreview'
import Category from '../Category/Category'
import {getCategoriesandDocuments} from '../../utils/firebase/firebase';
import {setCategories} from '../../store/categories/categoryAction'

import './Shop.scss'

const Shop = () => {

    const dispatch = useDispatch()

    useEffect(() =>{
        const getCategoriesMap = async() =>{
            const categoriesArray = await getCategoriesandDocuments('categories');
            dispatch(setCategories(categoriesArray));            
        }
        getCategoriesMap();
    }, []);
    
    return (
       <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=':category' element={<Category />} />
       </Routes>
    )
}

export default Shop;
