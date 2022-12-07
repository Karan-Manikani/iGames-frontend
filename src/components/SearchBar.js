// Modules
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Assets
import "../assets/css/searchbar.css";

// Redux
import { selectCart } from "./../features/cart/cartSlice";
import { selectUserDetails } from "../features/users/usersSlice";
import { getWishlist } from "../features/wishlist/wishlistSlice";
import { selectSearchMode } from "../features/search/SearchSlice";
import { fetchGames, getPageNumber } from "./../features/games/gamesSlice";
import { clearFilteredGames, populateFilteredGames, searchModeOff, searchModeOn } from "../features/search/SearchSlice";

function SearchBar(props) {
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");

    // Selectors
    const cart = useSelector(selectCart);
    const page = useSelector(getPageNumber);
    const wishlist = useSelector(getWishlist);
    const user = useSelector(selectUserDetails);
    const searchMode = useSelector(selectSearchMode);

    function handleChange(event) {
        setSearch(event.target.value);
        if (event.target.value.trim() === "") {
            dispatch(clearFilteredGames());
            dispatch(searchModeOff());
        }
        if (searchMode === false) {
            dispatch(searchModeOn());
        }
    }

    useEffect(() => {
        if (searchMode) {
            dispatch(searchModeOff());
        }
    }, []);

    useEffect(() => {
        if (Object.keys(user).length !== 0 && search.trim() !== "") {
            if (props.searchCat.toLowerCase() === "wishlist") {
                dispatch(populateFilteredGames({ search: search.trim().toLowerCase(), category: wishlist }));
            } else if (props.searchCat.toLowerCase() === "cart") {
                dispatch(populateFilteredGames({ search: search.trim().toLowerCase(), category: cart }));
            } else if (props.searchCat.toLowerCase() === "games") {
                dispatch(fetchGames({ search: search.trim().toLowerCase(), page: page }));
            }
        }
    }, [search]);

    return (
        <div className="search-bar">
            <span className="material-symbols-rounded search-icon">search</span>
            <input
                className="search-box"
                placeholder={`Search ${props.searchCat}`}
                results={"2"}
                onChange={handleChange}
                value={search}
            />
        </div>
    );
}

export default SearchBar;
