const request = require('request');


const fetchMyIP = function(callback) {
  request(`https://api.ipify.org/?format=json`, (error, response, body)=>{
    
    if (error) {
      return callback(error, null);
      
    }
    if (response.statusCode !== 200) {
      const msg = `Staus Code ${response.statusCode} when fetching IP. Response ${body}`;
      callback(Error(msg), null);
    }
    const ip  = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  const location = `https://freegeoip.app/json/${ip}`;
  request(location, (error,response, body)=>{
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Staus Code ${response.statusCode} when fetching Coordinates for IP. Response ${body}`;
      callback(Error(msg), null);
    }

    // const lat = JSON.parse(body).latitude;
    // const long = JSON.parse(body).longitude;
    const { latitude, longitude } = JSON.parse(body);
    // callback(null, `Longitude: ${long}`);
    // callback(null, `Latitude: ${lat}`);
    callback(null, { latitude, longitude });
  });

};
module.exports = { fetchMyIP, fetchCoordsByIP };