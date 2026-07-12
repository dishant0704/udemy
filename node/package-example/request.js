const axsios = require('axios');

axsios.get('https://jsonplaceholder.typicode.com/users/1')
.then((response) => {
    console.log(response.data); 
})
.catch((error) => {
    console.error(error);
}).then(() => {
    console.log('Request completed');
});