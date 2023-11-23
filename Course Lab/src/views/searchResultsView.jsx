import "/src/style.css";

function SearchResultsView(props) {
    return (
        <div>
            {[...props.searchResults].map(searchResultsCB)}
        </div>
    );

    function searchResultsCB(search_result) {
        //console.log(search_result)
        function resultClickACB(evt) {
            props.onResultClick(search_result);
            window.location.hash="#/details";       //3.3
        }

        return (
            <span   key={search_result.id} 
                    onClick={resultClickACB} 
                    class="search_result"
                    value={search_result}>
                <img src={search_result.image} height="100"></img>
                <div>{search_result.title}</div>
            </span>
        )
    }
}

export default SearchResultsView;
