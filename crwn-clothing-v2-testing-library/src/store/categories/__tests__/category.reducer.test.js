import { categoriesReducer, CATEGORIES_INITIAL_STATE } from '../category.reducer';
import {
    fetchCategoriesStart,
    fetchCategoriesSuccess,
    fetchCategoriesFailed,
  } from '../category.action';

  describe('Catefory reducer test',()=>{
    test('Fetch categories start',()=>{
        const expectedStage = {
            ...CATEGORIES_INITIAL_STATE,
            isLoading:true
        }

        expect(categoriesReducer(CATEGORIES_INITIAL_STATE, fetchCategoriesStart())).toEqual(expectedStage)
    
    })

    test('Fetch categories success',()=>{
        const mockData =[ 
            {
                title:'Mens',
                imageURL:'testUrl',
                items:[
                    {id:1,name:'item1'},
                    {id:2,name:'item2'},
                ]
            },
            {
                title:'Womens',
                imageURL:'testUrl',
                items:[
                    {id:3,name:'item3'},
                    {id:4,name:'item4'},
                ]
            }
        ] // end mockData

        const expectedStage = {
            ...CATEGORIES_INITIAL_STATE,
            isLoading:false,
            categories:mockData
        };

        expect(categoriesReducer(CATEGORIES_INITIAL_STATE, fetchCategoriesSuccess(mockData))).toEqual(expectedStage)

    }) // end Fetch categories success

    test('Fetachcategoriesfailed',()=>{
        const mockError = new Error('Error fetch catefories')
        const expectedStage = {
            ...CATEGORIES_INITIAL_STATE,
            isLoading:false,
            error:mockError
        }
        expect(categoriesReducer(CATEGORIES_INITIAL_STATE, fetchCategoriesFailed(mockError))).toEqual(expectedStage)
        
    })

  })