// Imports
import { useSelector } from "react-redux";

// Assets
import "../assets/css/cartScreen.css";

// Components
import EmptySVG from "../components/EmptySVG";
import CartItems from "../components/CartItems";
import CartSummary from "../components/CartSummary";
import SearchLinks from "../components/SearchLinks";

// Redux
import { selectCart } from "../features/cart/cartSlice";
import { selectUserDetails } from "../features/users/usersSlice";

function CartScreen() {
    const cart = useSelector(selectCart);
    const user = useSelector(selectUserDetails);

    function renderContent() {
        if (Object.keys(user).length === 0) {
            return (
                <div className="cart-screen">
                    <SearchLinks screen="Cart" hideBrowse={false} />
                    <h1>My Cart</h1>
                    <EmptySVG message="Login to view your cart" linkTxt="Login Now" link="/login" />
                </div>
            );
        } else if (user.cart.length === 0) {
            return (
                <div className="cart-screen">
                    <SearchLinks screen="Cart" hideBrowse={false} />
                    <h1>My Cart</h1>
                    <EmptySVG message="Cart is empty" linkTxt="Browse Games" link="/games" />
                </div>
            );
        } else {
            return (
                <div className="cart-screen">
                    <SearchLinks screen="Cart" hideBrowse={false} />
                    <h1>My Cart</h1>
                    {cart ? (
                        <div className="cart-main">
                            <div className="cart-main-items">
                                <CartItems />
                            </div>
                            <CartSummary />
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
            );
        }
    }

    return <>{renderContent()}</>;
}

export default CartScreen;
