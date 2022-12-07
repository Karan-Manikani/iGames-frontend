// Modules
import { Link } from "react-router-dom";

// Components
import SearchBar from "./SearchBar";

// Assets
import "../assets/css/searchLinks.css";

function SearchLinks(props) {
    return (
        <div className="search-links">
            {!props.hideSearch && <SearchBar searchCat={props.screen} />}
            {!props.hideBrowse && (
                <Link to={"/games"} className="browse-games">
                    Browse Games
                </Link>
            )}
        </div>
    );
}

export default SearchLinks;
