// import nodeCache from "node-cache";
// let myCache;

// export function start(done) {
//     if (myCache)
//         return done();
//     myCache = new nodeCache();
// }

// export function instance() {
//     return myCache;
// }

// const ttl = 15552000; // 6 months

// export async function saveCache(zone, times) {
//     myCache.set(zone, times, ttl);
// }

// export async function getCachedResult(zone) {
//     var times = await myCache.get(zone);
//     if (!times) {
//         var newUpdate = await fetch(`https://www.e-solat.gov.my/index.php?r=esolatApi/takwimsolat&period=week&zone=${zone}`);
//         var newData = await newUpdate.json();
//         myCache.set(zone, newData.prayerTime, ttl);
//         console.log("fetching and caching")
//         return newData.prayerTime;
//     } else {
//         console.log("using cache")
//         return times;
//     }
// }