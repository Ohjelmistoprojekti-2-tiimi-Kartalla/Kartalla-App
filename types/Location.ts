export type Location = {
    sportsPlaceId: number;
    name: string;
    type: {
        typeCode: number;
        name: string;
    };
    location: {
        address: string;
        city: {
            name: string;
            postalCode: string;
            postalOffice: string;
        };
        coordinates: {
            wgs84: {
                lat: number;
                lon: number;
            };
        };
        geometries: {
            type: "FeatureCollection";
            features: {
                type: "Feature";
                geometry: {
                    type: "Point" | "LineString";
                    coordinates: number[] | number[][];
                };
                properties?: any;
            }[];
        };
    };
    properties?: {
        infoFi?: string;
        routeLengthKm?: number;
        www?: string;
    };
};

// Created using ChatGPT according to Lipas API