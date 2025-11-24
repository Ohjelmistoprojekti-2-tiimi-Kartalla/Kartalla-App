import {PlacePhoto, PlaceWithPhotos} from '../types/GooglePlaces.types';

// Returns the whole place object from Google Places Platform
const getGooglePlacesFromPlatform = (textQuery: string): Promise<PlaceWithPhotos[]> => {
  return fetch('https://places.googleapis.com/v1/places:searchText?alt=json&fields=*&prettyPrint=true', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + process.env.GOOGLEPLATFORM_API_KEY,
      Accept: "application/json",
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "textQuery": { textQuery }
    })
  })
    .then(response => response.json())
    .then(json => {
      return json.places;
    })
    .catch(error => {
      console.error(error);
    });
};

//Returns Google image from first author
const getGoogleImageFromPlatform = (textQuery: string): Promise<PlacePhoto[]> => {
  return fetch('https://places.googleapis.com/v1/places:searchText?alt=json&fields=*&prettyPrint=true', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + process.env.GOOGLEPLATFORM_API_KEY,
      Accept: "application/json",
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "textQuery": { textQuery }
    })
  })
    .then(response => response.json())
    .then(json => {
      return json.places.photos[0].googleMapsUri;
    })
    .catch(error => {
      console.error(error);
    });
};

//Returns multiple images from platrform, photos contains informations about author also.
const getGoogleMultipleImageFromPlatform = (textQuery: string): Promise<PlacePhoto[]> => {
  return fetch('https://places.googleapis.com/v1/places:searchText?alt=json&fields=*&prettyPrint=true', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + process.env.GOOGLEPLATFORM_API_KEY,
      Accept: "application/json",
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "textQuery": textQuery
    })
  })
    .then(response => response.json())
    .then(json => {
      return json.places.photos;
    })
    .catch(error => {
      console.error(error);
    });
};

export { getGoogleImageFromPlatform, getGoogleMultipleImageFromPlatform, getGooglePlacesFromPlatform }