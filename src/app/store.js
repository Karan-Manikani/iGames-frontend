import { configureStore } from "@reduxjs/toolkit";

// Reducers
import cartReducer from "../features/cart/cartSlice";
import gamesReducer from "../features/games/gamesSlice";
import usersReducer from "../features/users/usersSlice";
import SearchReducer from "../features/search/SearchSlice";
import productReducer from "../features/product/productSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice";
import featuredGamesReducer from "../features/featured-games/featuredGamesSlice";

export default configureStore({
    reducer: {
        cart: cartReducer,
        games: gamesReducer,
        users: usersReducer,
        search: SearchReducer,
        product: productReducer,
        wishlist: wishlistReducer,
        featuredGames: featuredGamesReducer,
    },
});
