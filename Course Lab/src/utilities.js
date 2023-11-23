/* compare two ingredients, for sorting */
function compareIngredientsCB(ingredientA, ingredientB){
    // each ingredient object has aisle and name properties.
    if (ingredientA.aisle < ingredientB.aisle) {
        return -1;
    }
    else if (ingredientA.aisle > ingredientB.aisle) {
        return 1;
    }

    if (ingredientA.name < ingredientB.name) {
        return -1;
    }
    else if (ingredientA.name > ingredientB.name) {
        return 1;
    }

    return 0;

    // see Array.sort() documentation
}


/* 
  Use the above comparator callback to sort the given ingredient array.
  Note that sort() will change the original array. To avoid that, use [...ingredients] which creates a new array and spreads the elements of the `ingredients` array.
*/
function sortIngredients(ingredients){
    return [...ingredients].sort(compareIngredientsCB);
}

// helper object for isKnownType and dish sorting
const dishTypeRanking={
    "starter":1,
    "main course":2,
    "dessert":3,
    "":0
};

function isKnownTypeCB(type){
    // otherwise return falsy (false, 0, undefined, or "")
    // Remember the object[key] syntax! It returns undefined if the key is not present in the object.
    // Optional: using truthy / falsy you can write this without if() ! 

    return dishTypeRanking[type];
}

/* dish.dishTypes will contain an array of dish types, of which we have to pick one that is known.
  Pass isKnownTypeCB as a callback to `Array.find()` to determine the dish known type. 
  If a known type cannot be determined, return "" 
*/
function dishType(dish){
    if (!dish.dishTypes) {
        return "";
    }
    const result = dish.dishTypes.find(isKnownTypeCB);
    if (result) {
        return result;
    }
    return "";
}

/* 
   Write a sort() comparator callback that compares dishes by their type, 
   so that all starters come before main courses and main courses come before desserts 
*/
function compareDishesByTypeCB(dishA, dishB){
    // use dishType(dishA) and dishType(dishB)
    // use dishTypeRanking to convert these types to integers
    // once you know the integers, simply compare them
    // return negative, 0 or positive, see Array.sort() documentation. Hint: a comparator for two numberrs can simply subtract them, rather than using if()
    if (dishTypeRanking[dishType(dishA)] < dishTypeRanking[dishType(dishB)]) {
        return -1;
    }
    else if (dishTypeRanking[dishType(dishA)] > dishTypeRanking[dishType(dishB)]) {
        return 1;
    }
    return 0;
}


/* 
   Sort the dishes using the comparator callback above.
*/
function sortDishes(dishes){
    return [...dishes].sort(compareDishesByTypeCB);
}

/* 
   Given a menu of dishes, generate a list of ingredients. 
   If an ingredient repeats in several dishes, it will be returned only once, with the amount added up 
   
   As this is not an algorithm course, the function is mostly written but you have 2 callback passing TODOs.
*/
function shoppingList(dishes){
    const result={}; // object used as mapping between ingredient ID and ingredient object

    // we define the callback inside the function, though this is not strictly needed in this case. But see below.
    function keepJustIngredientsCB(dish){
        return dish.extendedIngredients;
    }
    
    // ingredientCB must be defined inside shopingList() because it needs access to `result`
    // you will often need to define a callback inside the function where it is used, so it has access to arguments and other variables
    function ingredientCB(ingredient){
        if(result[ingredient.id] === undefined){  // more general: !result[ingredient.id]
            // since result[ingredient.id] is not defined, it means that the ingredient is not taken into account yet
            // so we associate the ingredient with the ID
            result[ingredient.id]={...ingredient};
            
            // JS Notes about the line above:
            // 1)    result[ingredient.id] 
            // In JS object.property is the same as object["property"] but the second notation is more powerful because you can write
            // object[x]  where x=="property"
            
            // 2)    {...ingredient } creates a *copy* of the ingredient (object spread syntax)
            // we duplicate it because we will change the object below
        } else {
            // since result[ingredient.id] is not defined, it means that the ingredient has been encountered before.
            // so we add up the amount:
            result[ingredient.id].amount +=  ingredient.amount;
        }
    }

    const arrayOfIngredientArrays= dishes.map(keepJustIngredientsCB);
    const allIngredients= arrayOfIngredientArrays.flat();    
    allIngredients.forEach(ingredientCB);

    // Note: the 3 lines above can be written as a function chain:
    // dishes.map(callback1).flat().forEach(callback2);

    // now we transform the result object into an array: we drop the keys and only keep the values
    return Object.values(result);
}


/* Given a dish array, calculate their total price with a map-reduce callback exercise */
function menuPrice(dishesArray){
    function priceOfDish(dish) {
        return dish.pricePerServing;
    }
    function sumCB(param1, param2) {
        return param1 + param2;
    }

    const dishPrices = dishesArray.map(priceOfDish);
    //        This will produce the total price, which you return
    return dishPrices.reduce(sumCB, 0);
}


/*
  At this point, all of TW1.1 tests should pass!
*/

export {compareIngredientsCB, sortIngredients, isKnownTypeCB, dishType, sortDishes, shoppingList, menuPrice};

/*
  Optional: once you are done with the whole TW1, 
  if you want to learn more functional programming, you may want to rewrite shoppingList(dishes) 
  The unit tests will help you determine if your code is equivalent with the above.

  Problem: ingredientCB is not a pure function because it has a side effect: it changes the result object. 
  Instead, you can use reduce to produce the result object.

  allIngredients.reduce(amountReducerCB, {}), i.e. use an object as accumulator.
  
  To create new objects in the reducer CB, you can use either spread syntax {...object, other:property}  or Object.assign() 

  shoppingList() then becomes:
  return Object.values(dishes.map(callback1).flat().reduce(amountReducerCB, {}))
  
  And you can even move both callback definitions outside shoppingList() . Creating functions inside functions is more expensive 
  because the new function object is re-created and interpreted every time the enclosing function runs.
*/

