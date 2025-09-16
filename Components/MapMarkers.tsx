import { Marker } from "react-native-maps";

const myMarkerComponent = () => {
        const data = require('../test.json')
    return (
       data.map((location:any) => 
        <Marker
        key={location.coordinates}
     title={location.city} 
     coordinate={{latitude: parseFloat(location.coordinates[0]), longitude:parseFloat(location.coordinates[1])}} />)
    );
}
export {myMarkerComponent}