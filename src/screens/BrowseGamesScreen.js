// Modules
import { useEffect, useState } from "react";

// Assets
import "../assets/css/browseGamesScreen.css";

// Components
import Game from "./../components/Game";
import Error from "../components/Error";
import Paginate from "../components/Paginate";
import NoResults from "../components/NoResults";
import BrowseGamesSearch from "../components/BrowseGamesSearch";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getPageNumber } from "./../features/games/gamesSlice";
import { fetchGames, getGamesError, getGamesStatus, selectAllGames } from "../features/games/gamesSlice";

function BrowseGamesScreen() {
    const dispatch = useDispatch();

    // Selectors
    const page = useSelector(getPageNumber);
    const games = useSelector(selectAllGames);
    const gamesError = useSelector(getGamesError);
    const gamesStatus = useSelector(getGamesStatus);

    const [search, setSearch] = useState("");

    useEffect(() => {
        dispatch(fetchGames({ page: page, search: search }));
    }, [dispatch, page]);

    function renderGames() {
        return games.map((game) => {
            return (
                <div className="grid-item" key={game._id}>
                    <Game {...game} />
                </div>
            );
        });
    }

    switch (gamesStatus) {
        case "loading":
            return <p></p>;
        case "failed":
            if (games.length === 0) {
                return (
                    <div className="browse-games-screen">
                        <NoResults search={search} setSearch={setSearch} page={page} />
                    </div>
                );
            } else {
                return <Error code={gamesError.statusCode} message={gamesError.response} />;
            }
        case "succeeded":
            return (
                <div className="browse-games-screen">
                    <BrowseGamesSearch search={search} setSearch={setSearch} page={page} />
                    <div className="games-grid">{renderGames()}</div>
                    <div className="pagination-links">
                        <Paginate />
                    </div>
                </div>
            );
        default:
            break;
    }
}

export default BrowseGamesScreen;
