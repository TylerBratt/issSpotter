const request = require('request');


const fetchMyIP = function(callback) {
  request(`https://api.ipify.org/?format=json`, (error, response, body)=>{
    
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
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
      callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
      return;
    }
    // const lat = JSON.parse(body).latitude;
    // const long = JSON.parse(body).longitude;
    // callback(null, `Longitude: ${long}`);
    // callback(null, `Latitude: ${lat}`);
    const { latitude, longitude } = JSON.parse(body);
    callback(null, { latitude, longitude });
    
  });
};

const fetchISSFlyOverTimes = ((coords, callback) => {
  const overHead = `http://api.open-notify.org/iss-pass.json?lat=43.6653&lon=79.4343`;
  request(overHead, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }
    const flyOver = JSON.parse(body).response;
    callback(null, flyOver);
  });
});

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) =>{
    if (error) {
      callback(error, null);
      return;
    }
    fetchCoordsByIP((error, coords) => {
      if (error) {
        callback(error, null);
        return;
      }
      fetchISSFlyOverTimes((error, nextPass) => {
        if (error) {
          callback(error, null);
          return;
        }
        callback(null, nextPass);
      });
    });
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };