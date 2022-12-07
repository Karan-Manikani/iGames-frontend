// Modules
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Assets
import "../assets/css/wishlistScreen.css";

// Components
import WishlistGame from "../components/WishlistGame";

// Redux
import { selectUserDetails } from "../features/users/usersSlice";
import { getWishlist } from "./../features/wishlist/wishlistSlice";
import { loadWishlist } from "./../features/wishlist/wishlistSlice";
import { clearFilteredGames, selectFilteredGames, selectSearchMode } from "../features/search/SearchSlice";

function WishlistItems() {
    const dispatch = useDispatch();

    // Selectors
    const wishlist = useSelector(getWishlist);
    const user = useSelector(selectUserDetails);
    const filteredGames = useSelector(selectFilteredGames);
    const searchMode = useSelector(selectSearchMode);

    useEffect(() => {
        if (Object.keys(user).length !== 0) {
            dispatch(loadWishlist({ ids: user.wishlist }));
        }
    }, [user._id, user.wishlist]);

    useEffect(() => {
        if (filteredGames.length !== 0) {
            dispatch(clearFilteredGames());
        }
    }, []);

    return (
        <>
            {!searchMode
                ? wishlist.map((game) => <WishlistGame key={game._id} {...game} />)
                : filteredGames.map((game) => <WishlistGame key={game._id} {...game} />)}
        </>
    );
}

export default WishlistItems;
