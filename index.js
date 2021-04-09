const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = passTimes => {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds`);
  }
};


nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  printPassTimes(passTimes);
});
// fetchMyIP((error, ip) =>{
//   if (error) {
//     console.log(`It didn't work!`, error);
//     return;
//   }
//   console.log(`It worked! Returned IP:`, ip);
// });

// fetchCoordsByIP('99.238.236.196', (error, coords) => {
//   if (error) {
//     console.log(`It didn't work!`, error);
//   }
//   console.log(`It worked! Returned coordinates:`, coords);
// });

// fetchISSFlyOverTimes('latitude: 43.6653, longitude: -79.4343',(error, flyover)=>{
//   if (error) {
//     console.log(`It didn't work!`, error);
//   }
//   console.log(`it worked! Flyover occurs:`, flyover);
// });
