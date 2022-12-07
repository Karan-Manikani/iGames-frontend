// Modules
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Assets
import "../assets/css/wishlistGames.css";

// Redux
import { removeFromCart } from "./../features/users/usersSlice";
import { addToCart, removeFromWishlist, selectUserDetails } from "../features/users/usersSlice";
import { removeFromFilteredGames, selectSearchMode } from "../features/search/SearchSlice";

function WishlistGame(props) {
    const dispatch = useDispatch();

    // Selectors
    const user = useSelector(selectUserDetails);
    const searchMode = useSelector(selectSearchMode);

    function handleWishlistRemove() {
        if (searchMode) {
            dispatch(removeFromFilteredGames(props._id));
        }
        dispatch(removeFromWishlist({ gameId: props._id, userId: user._id }));
    }

    function handleCartRequest() {
        if (user.cart.includes(props._id)) {
            dispatch(removeFromCart({ gameId: props._id, userId: user._id }));
        } else {
            dispatch(addToCart({ gameId: props._id, userId: user._id }));
        }
    }

    return (
        <div className="wishlist-game">
            <div className="wishlist-game-left">
                <h3 className="wishlist-game-name">
                    <Link
                        to={`/games/${props._id}`}
                        style={{ textDecoration: "none" }}
                        className="wishlist-game-name-link"
                    >
                        {props.name}
                    </Link>
                </h3>

                <img src={props.images[0]} alt="game=banner" className="wishlist-game-image" />
            </div>
            <div className="wishlist-game-right">
                <p className="wishlist-game-price">{props.price === 0 ? "Free" : `$ ${props.price}`}</p>
                <div className="wishlist-buttons">
                    <button onClick={handleCartRequest}>
                        {user.cart.includes(props._id) ? "REMOVE FROM CART" : "ADD TO CART"}
                    </button>
                    <button onClick={handleWishlistRemove}>REMOVE</button>
                </div>
            </div>
        </div>
    );
}

export default WishlistGame;
