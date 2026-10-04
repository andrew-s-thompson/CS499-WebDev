export function toFahrenheit(c) {
    return (c * 9 / 5) + 32;
}
export function toMph(kmh) {
    return kmh * 0.621371;
}

export function round(n) {
    return Math.round(n * 10) / 10; 
    // apparently round can't be set to decimals?
}