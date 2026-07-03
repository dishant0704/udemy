const fetch = require('node-fetch');
const { getPeople, getPeoplePromise } = require('./script2');

it('Call swapi to get people',()=>{
    expect.assertions(1)
    return getPeople(fetch).then(data=>{        
        expect(data.count).toEqual(87);
    })
})

it('Call swapi to get people promise',()=>{
    expect.assertions(2)
    return getPeoplePromise(fetch).then(data=>{
        expect(data.count).toEqual(87);
        expect(data.results.length).toBeGreaterThan(5);
    })
})

it('Get people count and result',()=>{
    const mockFetch = jest.fn()
    .mockReturnValue(Promise.resolve({
        json: () => Promise.resolve({
            count: 87,
            results: [0,1,2,3,4,5]
        })
    }))

    expect.assertions(4)
    return getPeoplePromise(mockFetch).then(data=>{
        expect(mockFetch.mock.calls.length).toBe(1);
        expect(mockFetch).toBeCalledWith('https://swapi.py4e.com/api/people/');
        expect(data.count).toEqual(87);
        expect(data.results.length).toBeGreaterThan(5);
    })
})