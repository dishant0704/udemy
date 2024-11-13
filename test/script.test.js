const googleSearch = require('./script')

dbMock = ["gmail.com", "google.com", "yahoo.com", "youTube.com"];

describe('GoogleSearch: ', ()=>{
    it('is Searching google Test',()=>{
        expect(googleSearch("gmailw", dbMock)).toEqual([]);
        expect(googleSearch("gmail.com", dbMock)).toEqual(["gmail.com"]);
    })
    
    it('Work with undefined and null',() => {
        expect(googleSearch(undefined, dbMock)).toEqual([]);
        expect(googleSearch(null, dbMock)).toEqual([]);
    });
    
    it('dos not return more than 3 match',() => {    
        expect(googleSearch('.com', dbMock).length).toEqual(4);
    });
})