// Modules
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Assets
import "../assets/css/cartItems.css";

// Components
import CartGame from "../components/CartGame";

// Redux
import { loadCart } from "../features/cart/cartSlice";
import { selectCart } from "../features/cart/cartSlice";
import { selectUserDetails } from "../features/users/usersSlice";
import { clearFilteredGames, selectFilteredGames, selectSearchMode } from "../features/search/SearchSlice";

function CartItems() {
    const dispatch = useDispatch();

    // Selectors
    const cart = useSelector(selectCart);
    const user = useSelector(selectUserDetails);
    const searchMode = useSelector(selectSearchMode);
    const filteredGames = useSelector(selectFilteredGames);

    useEffect(() => {
        if (Object.keys(user).length !== 0) {
            dispatch(loadCart({ ids: user.cart }));
        }
    }, [user._id, user.cart]);

    useEffect(() => {
        if (filteredGames.length !== 0) {
            dispatch(clearFilteredGames());
        }
    }, []);

    return (
        <>
            {!searchMode
                ? cart.map((game) => <CartGame key={game._id} {...game} />)
                : filteredGames.map((game) => <CartGame key={game._id} {...game} />)}
        </>
    );
}

export default CartItems;
