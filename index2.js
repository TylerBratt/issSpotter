const { fetchMyIP } = require('./issPromised');
const { fetchCoordsByIP } = require('./issPromised');
const { fetchISSFlyOverTimes } = require('./issPromised');
const { nextISSTimesForMyLocation } = require('./issPromised');

const printPassTimes = passTimes => {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds`);
  }
};

fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then(body => console.log(body));

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error)=>{
    console.log(`It didn't work; `, error.message);
  });


  