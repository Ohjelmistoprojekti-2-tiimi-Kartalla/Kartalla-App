import { Location } from "../types/Location";

export function getCoordinates(location: Location): { lat: number; lon: number } | null {
  // koordinaatit voivat tulla joko location.coordinates.wgs84 tai location.geometries.features[0] ks. Location.ts
  const wgs84 = location.location?.coordinates?.wgs84;
  if (wgs84?.lat !== undefined && wgs84?.lon !== undefined) {
    return { lat: wgs84.lat, lon: wgs84.lon };
  }
  // Jos koordinaatiot ovat geometrioissa, kerrotaan, missä kohtaa ne ovat:
  const firstFeature = location.location?.geometries?.features?.[0];
  if (!firstFeature) return null;

  // jos ovat geometrioisa tarkastetaan kumman tyyppisenä
  if (firstFeature.geometry.type === "Point") {
    const [lon, lat] = firstFeature.geometry.coordinates as number[];
    return { lat, lon };
  }

  if (firstFeature.geometry.type === "LineString") {
    const coords = firstFeature.geometry.coordinates as number[][];
    if (coords.length > 0) {
      const [lon, lat] = coords[0]; // otetaan linjasta ensimmäinen piste
      return { lat, lon };
    }
  }
  return null;
}

