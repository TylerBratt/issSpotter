const request = require('request');
const myIP = `https://api.ipify.org/?format=json`;

const fetchMyIP = function(callback) {
  request(myIP, (error, response, body)=>{
    const data  = JSON.parse(body);
    if (error) {
      return callback(error, null);
      
    }
    if (response.statusCode !== 200) {
      const msg = `Staus Code ${response.statusCode} when fetching IP. Response ${body}`;
      callback(Error(msg), null);
    }
    callback(null ,data.ip);
  });
};

module.exports = { fetchMyIP };