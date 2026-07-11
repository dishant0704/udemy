function encriptData(data) {
    return data.split('').reverse().join('');
}

function sendRequest(url, data) {
    const encryptedData = encriptData(data);
    console.log(`Sending request to ${url} with data: ${encryptedData}`);
}
module.exports = { sendRequest };