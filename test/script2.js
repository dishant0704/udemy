//const fetch = require('node-fetch');

const getPeoplePromise = async(fetch) =>{
    const url = 'https://swapi.py4e.com/api/people/'; //https://swapi.py4e.com/api/people/
    return fetch(url).then(responce =>responce.json()).then(data=>{
       
        return {
            count: data.count,
            results: data.results
          }
    })
}
//getPeoplePromise(fetch)

const getPeople = async(fetch) =>{
    const url = 'https://swapi.py4e.com/api/people/'; //https://swapi.py4e.com/api/people/
    const getRequest = await fetch(url);
    const data = await getRequest.json();
        
        return {
            count: data.count,
            results: data.results
          }
}

module.exports = {
   getPeople,
   getPeoplePromise 
}