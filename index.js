const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');

// fetchMyIP((error, ip) =>{
//   if (error) {
//     console.log(`It didn't work!`, error);
//     return;
//   }
//   console.log(`It worked! Returned IP:`, ip);
// });

// fetchCoordsByIP((ip, callback) => {
//   if (Error) {
//     callback(`It didn't work!`);
//     return;
//   }
//   console.log(`It worked! Returned IP:`, ip);
// });