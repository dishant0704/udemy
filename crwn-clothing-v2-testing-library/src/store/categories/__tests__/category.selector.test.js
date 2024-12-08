import {selectCategories, selectCategoriesIsLoading, selectCategoriesMap} from '../category.selector'

const mockState = {
    categories: {
        isLoading: false,
        categories:[
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
        ]
    }
}

describe('Categories selector', ()=>{
    test('should return the categories state', () => {
        const categoriesSlice = selectCategories(mockState)
        expect(categoriesSlice).toEqual(mockState.categories.categories)
    })
    test('selectCategoriesIsLoading should return isLoading state', ()=>{
        const isLoading = selectCategoriesIsLoading(mockState)
        expect(isLoading).toBe(false)
    })
    test('selectCategoriesMap should conver items array into the appropriate map',()=>{
        const expectedCategoriesMap = {
            mens:[
                {id:1,name:'item1'},
                {id:2,name:'item2'},
            ],
            womens:[
                {id:3,name:'item3'},
                {id:4,name:'item4'},
            ]
        }
        const categoriesMap = selectCategoriesMap(mockState)
        expect(categoriesMap).toEqual(expectedCategoriesMap)
    })
})