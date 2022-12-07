import { Link } from "react-router-dom";
import "../assets/css/searchLinks.css";
import SearchBar from "./SearchBar";

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
