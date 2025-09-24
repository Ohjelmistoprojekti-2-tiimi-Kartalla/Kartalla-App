import { Location } from "../types/Location";
import { getCoordinates } from "../utils/mapUtils";

const NATURE_LOCATIONS_JSON_URL = "http://lipas.cc.jyu.fi/api/sports-places?typeCodes=4404&typeCodes=4405&typeCodes=111&pageSize=100";
// Luotopolku 4044, Retkeilyreitti 4405, Kansallispuisto 111 --> Voidaan lisätä muita samalla tavalla

export async function fetchFullNatureLocation(id: number): Promise<Location> {
    const url = `http://lipas.cc.jyu.fi/api/sports-places/${id}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Status code ${response.status}`);
    }
    return response.json(); // returns the full Location object
}

export interface BoundingBox {
    north: number;
    south: number;
    east: number;
    west: number;
}

export async function fetchNatureLocations(bounds?: BoundingBox): Promise<Location[]> {
    const response = await fetch(NATURE_LOCATIONS_JSON_URL);
    if (!response.ok) {
        console.log(response);
        throw new Error(`Received status code ${response.status}`);
    }
    const minimalData = await response.json(); // this gets only the id:s

    // Fetch each location separately to get location and name, this fetches 100 locations
    const data = await Promise.all(
        minimalData.map((location: any) => fetchFullNatureLocation(location.sportsPlaceId))
    );

    // Filter locations within bounds
    if (bounds) {
        return data.filter((location) => {
            const coords = getCoordinates(location);
            if (!coords) return false;

            return (
                coords.lat <= bounds.north &&
                coords.lat >= bounds.south &&
                coords.lon <= bounds.east &&
                coords.lon >= bounds.west
            );
        });
    }

    return data;
}