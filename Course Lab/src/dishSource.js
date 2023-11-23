import {BASE_URL, API_KEY} from "./apiConfig.js";

export function getMenuDetails(dish_ids) {
    const id_args = dish_ids.join(",");         //or without ","

    return fetch(BASE_URL+"recipes/informationBulk?ids="+id_args, {
        headers: {
            "X-Mashape-Key": API_KEY
        }
    }).then(getJsonACB);            //response -Java Script Object Notation
}

export function getDishDetails(id) {
    return getMenuDetails([id]).then(myArrayToObjectACB).catch(errorACB);

    function myArrayToObjectACB(arr) {
        return arr[0];
    }

    function errorACB(error) {
        console.log("ERROR: " + error);
    }
}

export function searchDishes(searchParams) {
    const params = new URLSearchParams(searchParams);

    return fetch(BASE_URL+"recipes/complexSearch?"+params, {
        headers: {
            "X-Mashape-Key": API_KEY
        }
    }).then(getJsonACB).then(getArrayACB);

    function getArrayACB(result) {
        return result["results"];
    }
}

function getJsonACB(response) {
    if (!response.ok) {
        throw new Error("Error: " + response.status);
    }
    return response.json();
}
