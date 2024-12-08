import { screen } from "@testing-library/react";

import {renderWithProvider} from "../../../utils/test.utils"

import Category from "../category.component";

jest.mock('react-router-dom',()=>({
    ...jest.requireActual('react-router-dom'),
    useParams: () =>({
        category: 'mens'
    })
}),
)

describe('Category test',()=>{
    
    //isLoading is true
    test('It should render a Spinner if isLoading is true', ()=>{
        renderWithProvider(<Category />,
            {
                preloadedState:{
                    categories: {
                        isLoading: true,
                        categories: []
                    }
                }
            }
        );
        const spinnerElement = screen.getByTestId("spinner");
        expect(spinnerElement).toBeInTheDocument();
    });
    
    //isLoading is false
    test('It should render product if isLoading is false and there are items present',()=>{        
        renderWithProvider(<Category />,
            {
                preloadedState:{
                    categories: {
                        isLoading: false,
                        categories: [{
                            title: 'mens',
                            items:[
                                {id: 1, name: 'product 1'},
                                {id: 2, name: 'product 2'}
                            ]
                        }]
                    }
                }
            }
        );

        const spinnerElement = screen.queryByTestId("spinner");
        expect(spinnerElement).toBeNull();

        const product1Element = screen.getByText(/product 1/i)
        expect(product1Element).toBeInTheDocument()
    })
});
//end describe