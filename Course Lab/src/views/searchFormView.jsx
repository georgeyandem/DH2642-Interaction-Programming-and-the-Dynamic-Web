
function SearchFormView(props) {
    function inputChangeACB(evt) {
        props.onInputChange(evt.target.value);
    }

    function selectChangeACB(evt) {
        props.onSelectChange(evt.target.value);
    }

    function buttonClickACB(evt) {
        props.onButtonClick();
    }

    function summaryClickACB(evt) {         //3.3 & the new summary button
        window.location.hash="#/summary";
    }

    return (
        <div>
            <br/>
            <div class= "bigger_text">Welcome to the menu planner!Search for recipes and add them to your menu.</div>
            <br/>
            <input onChange={inputChangeACB} value={props.text || ""}></input>
            <select onChange={selectChangeACB} value={props.type}>
                <option value="">Choose:</option>
                {[...props.dishTypeOptions].map(dishTypeOptionsCB)}
            </select>
            <button onClick={buttonClickACB}>Search!</button>
            <button onClick={summaryClickACB}>Summary</button>       
        </div>
    );

    function dishTypeOptionsCB(dish_type_option) {
        return (
            <option key={dish_type_option} 
                    value={dish_type_option}>
                {dish_type_option}
            </option>
        );
    }
}

export default SearchFormView;
