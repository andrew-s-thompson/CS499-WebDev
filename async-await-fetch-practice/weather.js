import { toFahrenheit, toMph, round } from './convert.js';
import { FORECAST_URL, GEO_URL } from './config.js';
import getPackingAdvice from './advice.js';


async function getCoordinates(city) {
    const response = await fetch(`${GEO_URL}?name=${city}&count=1`);
    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }
    const response_info = await response.json();

    if (!response_info.results) {
        throw new Error(`Error: City Not Found ${city}`);
    }
    return {name: response_info.results[0].name, 
        country: response_info.results[0].country, 
        latitude: response_info.results[0].latitude, 
        longitude: response_info.results[0].longitude, 
    }
}

// console.log(await getCoordinates("Paris"))


// In this function I am still confused. I couldn't figure out how to pass the city and country name, 
// and received the info that it should all happen inside the coordinates block. Why is that? 
// They don't seem really sequential if that is the case. 
// Is there another way to do it?
async function getTripReport(city) {
    return getCoordinates(city)
    .then(coordinates => {
        return fetch(`${FORECAST_URL}?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&current=temperature_2m,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`)
    
        .then(response => response.json())
        .then(data => {
            return {
            city: coordinates.name,
            country: coordinates.country,
            tempC: data.current.temperature_2m,
            windKmh: data.current.wind_speed_10m,
            maxC: data.daily.temperature_2m_max[0],
            minC: data.daily.temperature_2m_min[0],
            daily: {
                time: data.daily.time,
                max: data.daily.temperature_2m_max,
                min: data.daily.temperature_2m_min
            }
                };
        });
    });
}
// console.log(await getTripReport('Evansville'));

export function printReport(report) {
    console.log(
        `${report.city}, ${report.country} | ${round(report.tempC)}°C (${round(toFahrenheit(report.tempC))}°F) | Wind ${round(report.windKmh)} km/h (${round(toMph(report.windKmh))} mph) | Today: ${round(report.minC)}–${round(report.maxC)}°C | ${getPackingAdvice(report.tempC)}`);
}

export async function compareCities(cities) {
    const reports = await Promise.all(
            cities.map(city => getTripReport(city))
        )
        // This gets complicated in my head, I don't know much about the javascript sort functionality, so I found https://www.w3schools.com/js/js_array_sort.asp and used its information about how sort works for the following.
        reports.sort((a, b) => b.tempC - a.tempC);
        for (let i of reports) {
            console.log(`${i.city}: ${round(i.tempC)}°C`)
        }
        return reports
}

// await compareCities(['Oslo', 'Cairo', 'Lima'])

// Challenge
async function compareCities2(cities) {
    let reports = await Promise.all(
            cities.map(async city => {
                try {
                    return await getTripReport(city)
                }
                catch (error) {
                    console.log(`Could not get report for ${city}`);
                    return undefined;
                }
            }
            )
        );
        // Had to also look up javascript documentation for filter functionality (easier to understand)
            reports = reports.filter(report => report !== undefined);

        // This gets complicated in my head, I don't know much about the javascript sort functionality, so I found https://www.w3schools.com/js/js_array_sort.asp and used its information about how sort works for the following.
        reports.sort((a, b) => b.tempC - a.tempC);
        for (let i of reports) {
            console.log(`${i.city}: ${round(i.tempC)}°C`)
        }
        return reports
}

// await compareCities2(['Oslo', 'Cairo', 'Lima', 'Atlantisville'])


