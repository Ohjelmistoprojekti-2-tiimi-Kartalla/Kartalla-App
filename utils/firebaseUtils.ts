import { getDatabase, push, ref, child, get } from 'firebase/database';
import { app } from "../firebaseConfig";

const database = getDatabase(app);
const dbRef = ref(getDatabase());

const saveDataToFirebase = (data: any) => {
    push(ref(database, 'locations/'), data)
}

const checkIsDatabaseExist = () => {
    get(child(dbRef, `locations`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log("Database exists");
            return true;
        }
    }).catch((error) => {
        console.error(error);
    });
    console.log("No data available");
    return false;
}



export { saveDataToFirebase, checkIsDatabaseExist }