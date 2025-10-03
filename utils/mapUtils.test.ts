import { describe, expect, test } from '@jest/globals';
import { getBoundingBoxFromLocation } from './mapUtils';

describe('getBoundingBoxFromLocation', () => {
    test('should return correct bounding box for given location and given distance', () => {
        const bbox = getBoundingBoxFromLocation(60, 25, 100); // Helsinki ja 100 km
        expect(bbox).toEqual({
            north: 60.9009009009009,
            south: 59.0990990990991,
            east: 25.9009009009009,
            west: 24.0990990990991,
        });
    });
});

describe('getBoundingBoxFromLocation with default distance', () => {
    test('should return correct bounding box for given location and default distance', () => {
        const bbox = getBoundingBoxFromLocation(60, 25); // Helsinki ja oletus 50 km
        // Käytetään toBeCloseTo koska desimaalit voivat hieman vaihdella
        expect(bbox.north).toBeCloseTo(60.45045, 4);
        expect(bbox.south).toBeCloseTo(59.54955, 4);
        expect(bbox.east).toBeCloseTo(25.45045, 4);
        expect(bbox.west).toBeCloseTo(24.54955, 4);
    });
});