import DetailsView from "../views/detailsView.jsx";

export default function Details(props) {
    const state_data    = props.model.currentDishPromiseState.data;
    const state_promise = props.model.currentDishPromiseState.promise;
    const state_error   = props.model.currentDishPromiseState.error;
    
    function addButtonClickACB() {
        if (state_data) {
            props.model.addToMenu(state_data);
        }
    }

    function searchCB(dish) {
        return dish.id === props.model.currentDish;
    }

    if (state_error) {
        return (
            <span>{state_error}</span>
        );
    }

    if (state_data && state_promise) {
        return (
            <DetailsView    dishData={state_data}
                            guests={props.model.numberOfGuests}
                            isDishInMenu={props.model.dishes.find(searchCB)}
                            onAddButtonClick={addButtonClickACB}
            />
        );
    }

    if (state_promise && !state_data) {
        return (
            <img src="https://brfenergi.se/iprog/loading.gif"/>
        );
    }
    
    if (!state_promise) {
        return (
            <span>no data</span>
        );
    }    
}
