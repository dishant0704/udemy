import {CATEGORIES_ACTION_TYPES} from './categoryType';
import { createAction } from '../../utils/reducer/reducer';

export const setCategories = (categoriesArray) => 
   createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArray);