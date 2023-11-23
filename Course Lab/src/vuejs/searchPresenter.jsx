import SearchFormView from "/src/views/searchFormView.jsx";
import SearchResultsView from "/src/views/searchResultsView.jsx";

export default function Search(props) {
    const res_data      = props.model.searchResultsPromiseState.data;
    const res_promise   = props.model.searchResultsPromiseState.promise;
    const res_err       = props.model.searchResultsPromiseState.error;

    // Search form
    function inputChangeACB(dish_str) {
        props.model.setSearchQuery(dish_str);
    }

    function selectChangeACB(type_str) {
        props.model.setSearchType(type_str);
    }

    function buttonClickACB() {
        props.model.doSearch(props.model.searchParams);
    }

    // Search results
    function resultClickACB(dish) {
        props.model.setCurrentDish(dish.id);
    }

    return (
        <div>
            <SearchFormView 
                dishTypeOptions={["starter", "main course", "dessert"]}
                text={props.model.searchParams.query}
                type={props.model.searchParams.type}
                onInputChange={inputChangeACB}
                onSelectChange={selectChangeACB}
                onButtonClick={buttonClickACB}
            />
            {searchResults()}
        </div>
    );

    function searchResults() {
        if (res_err) {
            return (
                <span>{res_err}</span>
            );
        }
        if (res_data && res_promise) {
            return (
                <SearchResultsView  
                    searchResults={props.model.searchResultsPromiseState.data}
                    onResultClick={resultClickACB}
                />
            );
        }
        if (res_promise && !res_data) {
            return (
                <img src="https://brfenergi.se/iprog/loading.gif"/>
            );
        }
        if (!res_promise) {
            return (
                <span>no data</span>
            );
        }
    }
}
