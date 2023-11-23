import SidebarView from "../views/sidebarView.jsx";

export default
function Sidebar(props) {
    function numberChangeACB(number) {
        props.model.setNumberOfGuests(number);
    }

    function dishLinkClickACB(dish) {
        props.model.setCurrentDish(dish.id);
    }

    function removeDishACB(dish) {
        props.model.removeFromMenu(dish);
    }

    return (<SidebarView number={props.model.numberOfGuests} 
                         dishes={props.model.dishes}
                         onNumberChange={numberChangeACB}
                         onDishLinkClick={dishLinkClickACB}
                         onRemoveDish={removeDishACB}/>);
}
