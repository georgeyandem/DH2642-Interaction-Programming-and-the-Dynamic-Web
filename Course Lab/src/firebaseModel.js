import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set} from "/src/teacherFirebase.js";

// Add relevant imports here 
import firebaseConfig from "/src/firebaseConfig.js";     //import config from "./firebaseConfig.js";
import {getMenuDetails} from "/src/dishSource.js";      // to get the dish id

// Initialise firebase app, database, ref
const app= initializeApp(firebaseConfig)                // = initializeApp(config);
const db= getDatabase(app)

//  PATH is the “root” Firebase path. NN is your TW2_TW3 group number //firebase does not like null objects 
const PATH="dinnerModel59";     
const rf = ref(db, PATH);       //create a refrence object from a path - db is the object returned by getDatabase

function observerRecap() {
    //TODO
    return 0;
}
//firebase does not like null objects 
// https://stackblitz.com/edit/dh2642-firebase-convert?file=index.js
function modelToPersistence(model){     // part 1: convert the model to firebase                 
    function dishToIdCB(dish) {
        return dish.id;
    }

    return {
        no_of_guests: model.numberOfGuests,    // fieldPath : model.feild - same as ACB name, choose the name 
        dish_ids: [...model.dishes].map(dishToIdCB).sort(), //dish IDs should always be saved in the same order
        current_dish_id: model.currentDish
    };
}

function persistenceToModel(data, model){       // part 2: convert data from firebase to model
    if (!data) {                                //data may be falsy (nothing to present)          
        model.numberOfGuests = 2;                          
        model.currentDish    = null;            
    }
    else {
        model.numberOfGuests = data.no_of_guests;   // the opposite of model.field = data.fieldPath
        model.currentDish    = data.current_dish_id;
    }

    return getMenuDetails(data?.dish_ids || []).then(setDishesACB); //return a promise - save to model // data?.dish_ids will return undefined
                                                                    // firebase does not store empty arrays or empty objects
    function setDishesACB(dish_list) {          // p3 (poke)
        model.dishes = dish_list;               // model.pokemon=poke;   
    }   
}

function saveToFirebase(model){         
    if(model.ready) {                           //we do not want to save the model while it is being read
        set(rf, modelToPersistence(model));     // will save the model to firebase when ready
    }
}
// https://stackblitz.com/edit/fiebase-promise?file=index.js
function readFromFirebase(model){                           //firebase read promise - Read the model from Firebase
    model.ready = false;                                    // not ready to be use: loading circle >> then line 64 : ready to use
    return get(rf).then(convertACB).then(modelReadyACB);    //return a promise chain - get data from firebase

    function convertACB(snapshot) {                         //displayACB to object
        return persistenceToModel(snapshot.val(), model);   // data - it will return undefined if there was no data in firebase
    }

    function modelReadyACB() {                              // ready to use 
        model.ready = true;
    }
}
// https://stackblitz.com/edit/dh2642-reactive-side-effect?file=index.js
function connectToFirebase(model, watchFunction){           // Connects the application model to Firebase
    model.ready = true;
    readFromFirebase(model);                               // Read the model from firebase
    watchFunction(storedStateCheckACB, storedStateEffectACB);  //application state side effect - watchFunction(ACB1, ACB2) 
    
    function storedStateCheckACB() {                       
        return [model.numberOfGuests, model.dishes, model.currentDish]; // return a combination of these model properties
    }
    
    function storedStateEffectACB() {                      //ACB2 will be invoked when the ACB1 result changes. In ACB2, save the model to firebase
        saveToFirebase(model);
    }
}

// Remember to uncomment the following line:
export {modelToPersistence, persistenceToModel, saveToFirebase, readFromFirebase}

export default connectToFirebase;
