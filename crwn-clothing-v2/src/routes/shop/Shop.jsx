import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import CategoriesPreview from '../CategoriesPreview/CategoriesPreview'
import Category from '../Category/Category'
import {getCategoriesandDocuments} from '../../utils/firebase/firebase';
import { fetchCategoriesStart } from '../../store/categories/categoryAction'

import './Shop.scss'

const Shop = () => {

    const dispatch = useDispatch()

    useEffect(() =>{            
            dispatch(fetchCategoriesStart());
    }, []);
    
    return (
       <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=':category' element={<Category />} />
       </Routes>
    )
}

export default Shop;
