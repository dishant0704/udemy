const { sendRequest } = require("./request");
const { redData } = require("./responce");

function makeRequest(url, data) {
   sendRequest(url, data);
   return redData(url, data);
}

const responceData = makeRequest('https://google.com', 'Hello World');
// console.log(require.cache);