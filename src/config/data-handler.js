import * as cacheService from './cache-service';

export async function getData(zone, cached) {
    if (cached && cacheService != undefined) {
        console.log("this is from data handler")
        return cacheService.getCachedResult(zone);
    } else {
        try {
            const results = await fetch(`https://www.e-solat.gov.my/index.php?r=esolatApi/takwimsolat&period=week&zone=${zone}`);
            const data = await results.json();
            console.log("this is from fetched data handler")
            return data.prayerTime;
        } catch {
            return null;
        }
    }
}