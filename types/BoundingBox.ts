export class BoundingBox {
    north: number;
    south: number;
    east: number;
    west: number;

    constructor(north: number, south: number, east: number, west: number) {
        this.north = north;
        this.south = south;
        this.east = east;
        this.west = west;
    }

    contains(lat: number, lon: number): boolean {
        return (
            lat <= this.north &&
            lat >= this.south &&
            lon <= this.east &&
            lon >= this.west
        );
    }
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

