import {menuPrice, sortDishes, dishType} from "/src/utilities.js";
import "/src/style.css"

function SidebarView(props) {
    function minusOnClickACB(evt) {
        props.onNumberChange(props.number-1);
    }
    function plusOnClickACB(evt) {
        props.onNumberChange(props.number+1);
    }

    return (
        <div class="sidebar_window">
            <button onClick={minusOnClickACB} disabled={props.number <= 1}>-</button>
            {props.number}
            <button onClick={plusOnClickACB}>+</button>
            <table class="sidebar_table">
                <tbody>
                    {sortDishes([...props.dishes]).map(dishesTableRowCB)}
                    {dishesTotalRowCB(props.dishes)}
                </tbody>
            </table>
        </div>
    );

    function dishesTableRowCB(dish) {
        function dishLinkOnClickACB(evt) {
            props.onDishLinkClick(dish);
        }

        function xOnClickACB(evt) {
            props.onRemoveDish(dish);
        }

        return (
            <tr key={dish.id}>
                <td>
                    <button onClick={xOnClickACB}>X</button>
                </td>
                <td>
                    <a href="#/details" class="sidebar_text" onClick={dishLinkOnClickACB}>{dish.title}</a>
                </td>
                <td>{dishType(dish)}</td>
                <td class="sidebar_price">
                    {(dish.pricePerServing * props.number).toFixed(2)}
                </td>
            </tr>
        );
    }

    function dishesTotalRowCB(dishes) {
        return (
            <tr>
                <td></td>
                <td>Total:</td>
                <td></td>
                <td class="sidebar_price">
                    {(menuPrice(dishes) * props.number).toFixed(2)}
                </td>
            </tr>
        );
    }
}

export default SidebarView;