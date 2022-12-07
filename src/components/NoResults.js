import BrowseGamesSearch from "./BrowseGamesSearch";
import "../assets/css/noResults.css";

function NoResults(props) {
    return (
        <>
            <BrowseGamesSearch search={props.search} setSearch={props.setSearch} page={props.page} />
            <div className="no-results">
                <h1>No results found ¯\_(ツ)_/¯</h1>
                <p className="no-results-message">Unfortunately we could not find any results matching your search.</p>
            </div>
        </>
    );
}

export default NoResults;
