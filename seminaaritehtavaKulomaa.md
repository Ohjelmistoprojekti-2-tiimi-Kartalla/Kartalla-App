# Seminaarityö: TypeScriptin parempi hyödyntäminen projektissa

Tässä Ohjelmistokehityksen teknologioita -kurssin seminaari tehtävässä kehitän Ohjelmistoprojekti 2 -kurssilla tehtävää projektia.

## Tavoitteet

- Parantaa projektin koodin laatua ja luotettavuutta hyödyntämällä TypeScriptin ominaisuuksia entistä paremmin.
- Yhdenmukaistaa TypeScriptin käyttöä projektissa
- Muita oppimistavoitteita?


## Lähtötilanne ja projektin kuvaus

Lähtökohtana on Ohjelmistoprojekti 2 -kurssilla tehty luontokohteita hakeva Kartalla-sovellus, jota on kehitetty 5 hengen tiimissä muutaman kuukauden ajan. Kyseessä on React Nativella kehitetty mobiilisovellus, jossa on jo käytetty TypeScriptiä, mutta sen käyttöä voisi yhdenmukaistaa ja parantaa. 

## Toteutus ja opit

To do: Määrittele tyypit komponenteille ja tiloille 

Tarkastelin ja tein korjauksia projektissa:
- tilojen tyyppien määrittely
- Propsien tyypin määrittely
- React.FC:n käyttö funktionaalisissa komponenteissa

Inspiraation lähde tarkastelun kohteille: [Building React Native Apps with TypeScript: Best Practices](https://medium.com/@codenova/building-react-native-apps-with-typescript-best-practices-7c5840d45ed8)

### Tilojen tyyppien määrittely

vaikka TypeScript tulkitsee tilan tyypin alustetusta tilasta, sen voi varmuuden vuoksi määritellä eksplisiittisesti:

esim. 

```
const [mapReady, setMapReady] = useState(false);
```
```
const [mapReady, setMapReady] = useState<boolean>(false);
```

## Jatkokehitysideat


## Lähteet

[Building React Native Apps with TypeScript: Best Practices](https://medium.com/@codenova/building-react-native-apps-with-typescript-best-practices-7c5840d45ed8)

[TypeScript Tutorial for Beginners](https://www.youtube.com/watch?v=d56mG7DezGs)

[TypeScript with React Components](https://react.dev/learn/typescript#typescript-with-react-components)