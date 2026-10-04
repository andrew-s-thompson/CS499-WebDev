import { toFahrenheit, toMph, round } from './convert.js';
import getPackingAdvice from './advice.js';
import {delay, checkIn, checkInWithRetry} from './flight.js';


console.log(toFahrenheit(20), round(toMph(10)), getPackingAdvice(12));


// Wasn't entirely sure if the directions wanted this or the next:
// checkIn('Ana', 100)
//     .then(success => console.log(success))
//     .catch(error => console.log(error))
//     .finally(console.log('Check-in closed.'));

// delay(1000)
//     .then(function next() {
//         console.log("Gate opens");
//         return delay(1000);
//     })
//     .then(function next() {
//         console.log("Boarding");
//         return delay(1000);
//     })
//     .then(function next() {
//         console.log("Takeoff")
//     });

try {
    const checkedIn = await checkInWithRetry("Andrew", "3", 10);
} catch (error) {
    console.log(error);
} finally {
    "Check-in closed."
}

