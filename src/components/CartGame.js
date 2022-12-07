// Modules
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Assets
import "../assets/css/cartItems.css";

// Redux
import { removeFromCart } from "../features/users/usersSlice";
import { selectUserDetails } from "../features/users/usersSlice";
import { removeFromFilteredGames, selectSearchMode } from "../features/search/SearchSlice";

function CartGame(props) {
    const dispatch = useDispatch();

    // Selectors
    const user = useSelector(selectUserDetails);
    const searchMode = useSelector(selectSearchMode);

    function handleCartRemove() {
        if (searchMode) {
            dispatch(removeFromFilteredGames(props._id));
        }
        dispatch(removeFromCart({ gameId: props._id, userId: user._id }));
    }

    return (
        <div className="cart-items" key={props._id}>
            <div className="cart-game-left">
                <h3 className="cart-game-name">
                    <Link to={`/games/${props._id}`} style={{ textDecoration: "none" }} className="cart-game-name-link">
                        {props.name}
                    </Link>
                </h3>
                <img src={props.images[0]} alt="game-banner" className="cart-game-image" />
            </div>
            <div className="cart-game-right">
                <p className="cart-game-price">{props.price === 0 ? "Free" : `$ ${props.price}`}</p>
                <div className="cart-buttons">
                    <button onClick={handleCartRemove}>REMOVE</button>
                </div>
            </div>
        </div>
    );
}

export default CartGame;
