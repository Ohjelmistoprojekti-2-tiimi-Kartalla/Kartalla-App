// Individual author attribution for a photo
export type AuthorAttribution = {
  displayName?: string;
  uri?: string;
  photoUri?: string;
};

// A single photo object in Google Places API
export type PlacePhoto = {
  name: string;                   // places/{placeId}/photos/{photoId}
  widthPx: number;
  heightPx: number;
  googleMapsUri?: string;         // URL to open photo in Google Maps
  authorAttributions?: AuthorAttribution[];
};

// A place object that contains photos
export type PlaceWithPhotos = {
  name: string;                   // places/{placeId}
  id?: string;
  photos?: PlacePhoto[];
};

// Response object for places:searchText
export type GooglePlacesSearchResponse = {
  places?: PlaceWithPhotos[];
};


// Created using ChatGPT according to Google Places Platform documentation: 
// https://developers.google.com/maps/documentation/places/web-service/reference/rest/v1/places

