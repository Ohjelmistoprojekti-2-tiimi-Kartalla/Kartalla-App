import { Location } from "../types/Location";
import { BoundingBox } from "../types/BoundingBox";
import { getCoordinates } from "../utils/mapUtils";

const NATURE_LOCATIONS_JSON_URL = "http://lipas.cc.jyu.fi/api/sports-places?typeCodes=4404&typeCodes=4405&typeCodes=111&pageSize=100&page=";
// Luotopolku 4044, Retkeilyreitti 4405, Kansallispuisto 111, add others similarly

export async function fetchFullNatureLocation(id: number): Promise<Location> {
    const url = `http://lipas.cc.jyu.fi/api/sports-places/${id}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Status code ${response.status}`);
    }
    return response.json(); // returns the full Location object
}

export async function fetchNatureLocations(bounds?: BoundingBox): Promise<Location[]> {
    let allMinimalData: any[] = []
    let pageNumber = 1
    let lastPage = false
    //Loop to fetch all pages of data
    while (lastPage == false) {
        const response = await fetch(NATURE_LOCATIONS_JSON_URL + pageNumber);
        if (!response.ok) {
            console.log(response);
            throw new Error(`Received status code ${response.status}`);
        }
        const minimalData = await response.json(); // this gets only the id:s
        allMinimalData = allMinimalData.concat(minimalData)
        if (minimalData.length == 0) {
            lastPage = true
            break
        }
        pageNumber++;
    }

    // Fetch each location separately to get location and name
    const data = await Promise.all(
        allMinimalData.map((location: any) => fetchFullNatureLocation(location.sportsPlaceId))
    );

    // Filter locations within bounds
    if (bounds) {
        return data.filter((location) => {
            const coords = getCoordinates(location);
            if (!coords) return false;

            return bounds.contains(coords.lat, coords.lon);
            
        });
    }

    return data;
}