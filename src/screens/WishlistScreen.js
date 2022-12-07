// Modules
import { useSelector } from "react-redux";

// Assets
import "../assets/css/wishlistScreen.css";

// Components
import EmptySVG from "../components/EmptySVG";
import SearchLinks from "../components/SearchLinks";
import WishlistItems from "../components/WishlistItems";

// Redux
import { selectUserDetails } from "../features/users/usersSlice";

function WishlistScreen() {
    // Selectors
    const user = useSelector(selectUserDetails);

    if (Object.keys(user).length === 0) {
        return (
            <div className="cart-screen">
                <SearchLinks screen="Wishlist" hideBrowse={false} />
                <h1>My Wishlist</h1>
                <EmptySVG message="Login to view your wishlist" linkTxt="Login Now" link="/login" />
            </div>
        );
    } else if (user.wishlist.length === 0) {
        return (
            <div className="cart-screen">
                <SearchLinks screen="Wishlist" hideBrowse={false} />
                <h1>My Wishlist</h1>
                <EmptySVG message="Wishlist is empty" linkTxt="Browse Games" link="/games" />
            </div>
        );
    } else {
        return (
            <div className="wishlist-container">
                <SearchLinks screen="Wishlist" hideBrowse={false} />
                <h1>Wishlist</h1>
                <div className="wishlist-games">
                    <WishlistItems />
                </div>
            </div>
        );
    }
}

export default WishlistScreen;
