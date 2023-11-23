import "/src/style.css";

function DetailsView(props) {
    //console.log(props); //dishTypes ,image, pricePerServing, sourceUrl, extendedIngredients, instructions
    // <br/> line break element
    function addButtonClickACB(evt) {
        props.onAddButtonClick();       // tw2
        window.location.hash="#/search";    // tw3
    }

    function cancelButtonClickACB(evt) {
        window.location.hash="#/search";            
    }
    
    return (
        <div>
            <h1>{props.dishData.title}</h1>
            <div class="details_img_price">
                <span>
                    <img height="250" src={props.dishData.image}></img>
                </span>
                <span class="details_price">
                    <span>
                        Price: {props.dishData.pricePerServing}
                        <br/>
                        for {props.guests} guests: {(props.guests*props.dishData.pricePerServing).toFixed(2)}
                    </span>
                </span>
            </div>

            <div class="details_ingredients_buttons">
                <span class="details_ingredients">
                    {[...props.dishData.extendedIngredients].map(ingredientsCB)}
                </span>
                <button class="details_button" 
                        disabled={props.isDishInMenu}
                        onClick={addButtonClickACB}>
                    Add to menu!
                </button>
                <button class="details_button"
                        onClick={cancelButtonClickACB}>
                    Cancel
                </button>
            </div>

            <div class="details_instructions">
                {props.dishData.instructions}
            </div>

            <div>
                <a href={props.dishData.sourceUrl}>More information</a>
            </div>
        </div>
    );

    function ingredientsCB(ingredient) {
        return (
            <span>
                {ingredient.name}: {ingredient.amount} {ingredient.unit}
                <br/>
            </span>
        );
    }
}

export default DetailsView;
