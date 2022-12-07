// Modules
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// Assets
import "../assets/css/header.css";

// Redux
import { selectUserDetails } from "../features/users/usersSlice";

function Header() {
    const user = useSelector(selectUserDetails);

    return (
        <header>
            <div className="logo">
                <Link to={"/"} style={{ textDecoration: "none" }}>
                    <h1 className="logo__text">iGames</h1>
                </Link>
            </div>
            <div className="user-links">
                <div className="cart-links">
                    <Link to={"/wishlist"} style={{ textDecoration: "none" }}>
                        <span className="wishlist">Wishlist</span>
                    </Link>
                    <Link to={"/cart"} style={{ textDecoration: "none" }}>
                        <span className="cart">Cart</span>
                    </Link>
                </div>
                <Link to={Object.keys(user).length === 0 ? "/login" : "/me"} style={{ textDecoration: "none" }}>
                    <div className="user__info">
                        <span className="material-symbols-rounded md-dark">person</span>
                        <p className="user__name__signup">
                            {Object.keys(user).length === 0 ? "Sign In" : user.username}
                        </p>
                    </div>
                </Link>
            </div>
        </header>
    );
}

export default Header;
