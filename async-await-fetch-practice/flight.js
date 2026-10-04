export function delay(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms); 
        // I had to look up the structure for the settimeout to return a delayed promise. I'm still not 100% sure what's happening in a typical setTimeout call.
    });
}

export function checkIn(name, successChance) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random()*100 < successChance) {
                resolve(`${name} is checked in.`);
            } else {
                reject(`Check-in failed: server busy.`);
            }
    }, 1000);
});
}

export async function checkInWithRetry(name, maxTries, chance) {
    for (let i=0; i<maxTries; i++) {
        try {
            const output = await checkIn(name, chance);
            console.log(output);
            return;
        }
        catch (error) {
            console.error(`Try ${i} failed: Check-in failed: server busy`);
            await delay(500);
            if (i === maxTries-1) {
                throw new Error(`Could not check in ${name} after ${maxTries} tries.`);
            };
        }
    }
}