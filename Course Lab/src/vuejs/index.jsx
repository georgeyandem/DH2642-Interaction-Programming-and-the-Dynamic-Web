import "/src/teacherFetch.js"; // protection against fetch() in infinite re-render
import "/src/firebaseModel.js";     //  3

// (1) ------------ application state (model) -----------
import model from "/src/DinnerModel.js";

// uncomment to make the app update when the model changes.

import { reactive } from "vue";
const reactiveModel= reactive(model);


// then use reactiveModel instead of model below!

// (2) ----------  display (mount) the root component in the browser page. Pass model(1) as prop. ---------
// http://localhost:8080/vue.html

import {createApp, h} from "vue";
window.React= {createElement:h};  // needed in the lab because it works with both React and Vue

import {VueRoot, makeRouter} from "./VueRoot.jsx";      // makeRouter 3
import connectToFirebase, { readFromFirebase } from "../firebaseModel.js";  // 3 symbol
const app= createApp(<VueRoot model={reactiveModel} />);

app.use(makeRouter(reactiveModel)); // 3.3 use reactiveModel instead of model below!

app.mount('#root'); // mounts the app in the page DIV with the id "root"
// to see the DIV, look at vue.html in the developer tools Sources
// vue.html, with the content <div id="root"></div> is configured in vite.config.js

// ------ for debug purposes ----------
//window.myModel= model;             // make the model available in the Console
window.myModel= reactiveModel;  

// Empty search
reactiveModel.doSearch({});

// Connect model to realtime database      3
import {watch} from "vue";
//To make sure that the model is read from firebase when the app starts, as well as saved whenever it changes
connectToFirebase(reactiveModel, watch); 
