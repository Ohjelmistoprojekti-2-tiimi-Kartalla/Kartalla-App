import { Marker } from "react-native-maps";

//Komponetti saa datan propsina:
interface Props {
    locations: any[];
}

export const MarkerComponent: React.FC<Props> = ({locations}) => {
    return (
        <>
               {locations.map((place, index) => {
          const firstFeature = place.location?.geometries?.features?.[0];
          if (!firstFeature) return null;

          let lat: number | undefined;
          let lon: number | undefined;

          // Rajapinnasta tulee kahdenlaisia geometrioita: Point ja LineString, pitää käsitellä molemmat
          if (firstFeature.geometry.type === "Point") {
            [lon, lat] = firstFeature.geometry.coordinates as number[];
          } else if (firstFeature.geometry.type === "LineString") {
            [lon, lat] = (firstFeature.geometry.coordinates as number[][])[0];
          }

          if (lat === undefined || lon === undefined) return null;

          return (
            <Marker
              key={index}
              coordinate={{ latitude: lat, longitude: lon }}
              title={place.name || place['name-localized']?.fi || "Ei nimeä saatavilla"}
            />
          );
        })}
    </>
    );
}
