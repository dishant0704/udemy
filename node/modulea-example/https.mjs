import {sendRequest} from './request.mjs';
import {redData} from './responce.mjs';

function makeRequest(url, data) {
   sendRequest(url, data);
   return redData(url, data);
}

const responceData = makeRequest('https://google.com', 'Hello World');
console.log(responceData);