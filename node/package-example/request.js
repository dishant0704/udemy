const axsios = require('axios');

axsios.get('https://jsonplaceholder.typicode.com/users')
.then((response) => {
    console.log(response.data); 
})
.catch((error) => {
    console.error(error);
}).then(() => {
    console.log('Request completed');
});