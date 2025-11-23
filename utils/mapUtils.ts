import { Location } from "../types/Location";
import { BoundingBox } from "../types/BoundingBox";

export function getCoordinates(location: Location): { lat: number; lon: number } | null {
  // coordinates can come either from location.coordinates.wgs84 or location.geometries.features[0], see Location.ts
  
  const wgs84 = location.location?.coordinates?.wgs84;
  if (wgs84?.lat !== undefined && wgs84?.lon !== undefined) {
    return { lat: wgs84.lat, lon: wgs84.lon };
  }
  // If coordinates are in geometries, specify where they are:
  const firstFeature = location.location?.geometries?.features?.[0];
  if (!firstFeature) return null;

  // if they are in geometries, check which type
  if (firstFeature.geometry.type === "Point") {
    const [lon, lat] = firstFeature.geometry.coordinates as number[];
    return { lat, lon };
  }

  if (firstFeature.geometry.type === "LineString") {
    const coords = firstFeature.geometry.coordinates as number[][];
    if (coords.length > 0) {
      const [lon, lat] = coords[0]; // take the first point from the line
      return { lat, lon };
    }
  }
  return null;
}

// returns a square bounding box around a location with given distance in kilometers
export function getBoundingBoxFromLocation(lat: number, lon: number, deltaKm = 50): BoundingBox {

  const delta = deltaKm / 111;

  return new BoundingBox(
    lat + delta,
    lat - delta,
    lon + delta,
    lon - delta
  );
}

