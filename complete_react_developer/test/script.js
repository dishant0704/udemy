const googleDatabse =  [
    'cats.com',
    'souprecipes.com',
    'flowers.com',
    'animals.com',
    'catpictures.com',
    'myfavouritecats.com'
  ];

  const googleSearch = (searchStr, data) =>{
    let searchData  = []
    if(searchStr){
      searchData = data.filter((item)=>{
          return item.toLocaleLowerCase().includes(searchStr.toLocaleLowerCase())
      })      
    }    
    return searchData
  }

  //console.log(googleSearch('cats', googleDatabse)) 

  module.exports = googleSearch;