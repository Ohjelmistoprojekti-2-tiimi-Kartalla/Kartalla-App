const NATURE_LOCATIONS_JSON_URL = "http://lipas.cc.jyu.fi/api/sports-places?typeCodes=4404&typeCodes=4405&typeCodes=111&pageSize=100";
// Luotopolku 4044, Retkeilyreitti 4405, Kansallispuisto 111 --> Voidaan lisätä muita samalla tavalla

export async function fetchFullNatureLocation(id: number) {
  const url = `http://lipas.cc.jyu.fi/api/sports-places/${id}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Status code ${response.status}`);
  }
  return response.json(); // sisältää koko olion
}

export async function fetchNatureLocations() {
  const response = await fetch(NATURE_LOCATIONS_JSON_URL);
  if (!response.ok) {
    console.log(response);
    throw new Error(`Received status code ${response.status}`);
  }
  const minimalData = await response.json(); // tällä saa vain kohteiden id:t

  // Haetaan jokainen kohde erikseen, jotta saadaan location ja name
  const fullData = await Promise.all(
    minimalData.map((place: any) => fetchFullNatureLocation(place.sportsPlaceId))
  );

  return fullData;
}