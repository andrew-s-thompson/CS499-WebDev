const cities = ['Edinburgh', 'Copenhagen', 'London'];
import { printReport, compareCities } from "./weather.js";
import { round } from "./convert.js";

try {
const list = await compareCities(cities);
const city = list[0];
printReport(city);
console.log('Daily Forecast');
// Just needed to add the daily: items to the report. Now they can be accessed the same way.
    for (let i = 0; i < city.daily.time.length; i++) {
        console.log(
            `${city.daily.time[i]}: ` +
            `${round(city.daily.min[i])}–` +
            `${round(city.daily.max[i])}°C`
        );

}
}
catch (error) {
    console.log(`Could not populate full trip report: ${error}`);
}
finally {
    console.log(`Trip report complete.`);
}


