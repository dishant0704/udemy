import { createContext, useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';

import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';

export const CategoriesContext = createContext({
  categoriesMap: {},
});

 //collections
 const COLLECTIONS = gql`
 query{
 collections{
   id
   title
   items{
     id
     name
     price
     imageUrl
   }
 }
}
`

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({}); 
  const { loading, error, data } = useQuery(COLLECTIONS);
  useEffect(()=>{
    if(data){
      const {collections} = data
      const collectionsMap = collections.reduce((acc, collection) => {
        const {title, items} = collection;
        acc[title.toLowerCase()] = items;
        return acc;
      },{})
      console.log("categoriesMap: ", collectionsMap)
      setCategoriesMap(collectionsMap);
    }
  },[data])
  const value = { categoriesMap,  loading};
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
