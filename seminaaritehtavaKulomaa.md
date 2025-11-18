# Seminaarityö: TypeScriptin parempi hyödyntäminen projektissa

Tässä Ohjelmistokehityksen teknologioita -kurssin seminaari tehtävässä kehitän Ohjelmistoprojekti 2 -kurssilla tehtävää projektia.

## Tavoitteet

- Parantaa projektin koodin laatua ja luotettavuutta hyödyntämällä TypeScriptin ominaisuuksia entistä paremmin.
- Yhdenmukaistaa TypeScriptin käyttöä projektissa
- Muita oppimistavoitteita?

## Lähtötilanne ja projektin kuvaus

Lähtökohtana on Ohjelmistoprojekti 2 -kurssilla tehty luontokohteita hakeva Kartalla-sovellus, jota on kehitetty 5 hengen tiimissä muutaman kuukauden ajan. Kyseessä on React Nativella kehitetty mobiilisovellus, jossa on jo käytetty TypeScriptiä, mutta sen käyttöä voisi yhdenmukaistaa ja parantaa. 

## Toteutus ja opit

Tarkastelin ja tein korjauksia projektissa:
- tilojen tyyppien määrittely
- Propsien tyypin määrittely ja tarkempi nimeäminen
- React.FC:n käyttö funktionaalisissa komponenteissa
- kääntäjän virheiden tarkastukseen ja tarkkuuteen liittyvät asetukset

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

### Propsien tyypin määrittely ja tarkempi nimeäminen

Propsien tyypit oli projektissa jo hyvin määritelty, mutta niiden nimeämisessä oli parannettavaa. Nimesin kaikki propsit, niin että nimestä kävisi ilmi sen käyttötarkoitus. Kuvaava nimi on tärkeää varsinkin silloin kun propseilla välitetään tietoa komponenttien välillä.


### Kääntäjän virheiden tarkastuksen ja tarkkuuden asetukset

tsconfig-tiedostossa voi määritellä ComplilerOptions-asetukset, jotka määrittävät miten TypeScript-kääntäjä tarkastaa ja kääntää koodin. 

```
   "compilerOptions": {
     "strict": true,
     "noUnusedLocals": true,
    "noUnusedParameters": true
  },

```

## Jatkokehitysideat


## Lähteet

[Best Practices for Naming Conventions in React Native](https://medium.com/@imranrafeek/best-practices-for-naming-conventions-in-react-native-21f16df6179e)

[Building React Native Apps with TypeScript: Best Practices](https://medium.com/@codenova/building-react-native-apps-with-typescript-best-practices-7c5840d45ed8)

[The TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

[TypeScript Tutorial for Beginners](https://www.youtube.com/watch?v=d56mG7DezGs)

[TypeScript with React Components](https://react.dev/learn/typescript#typescript-with-react-components)