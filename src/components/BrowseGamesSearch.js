// Redux
import { useDispatch } from "react-redux";
import { fetchGames } from "../features/games/gamesSlice";

function BrowseGamesSearch(props) {
    const dispatch = useDispatch();

    return (
        <div className="browse-search-links">
            <div className="search-bar">
                <span className="material-symbols-rounded search-icon">search</span>
                <input
                    className="search-box"
                    placeholder={`Search Games`}
                    results={"2"}
                    onChange={(e) => props.setSearch(e.target.value)}
                    value={props.search}
                    onKeyPress={(e) =>
                        e.key === "Enter" && dispatch(fetchGames({ page: props.page, search: props.search }))
                    }
                />
            </div>
            <div
                className="search-button"
                onClick={() => dispatch(fetchGames({ page: props.page, search: props.search }))}
            >
                Search
            </div>
        </div>
    );
}

export default BrowseGamesSearch;
