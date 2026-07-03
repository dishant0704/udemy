
function decriptData(data) {
    return data.split('').reverse().join('');
}

function redData(url , data) {
 const decryptedData = decriptData(data);
 console.log(`Received response from ${url} with data: ${decryptedData}`);
 return decryptedData;
}
export {redData};

console.log('responce.mjs file loaded');