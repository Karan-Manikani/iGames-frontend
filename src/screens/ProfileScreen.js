// Modules
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Assets
import "../assets/css/profileScreen.css";

// Components
import UserInfo from "../components/UserInfo";

// Redux
import {
    clearError,
    deleteUserProfile,
    logoutUser,
    selectUserDetails,
    selectUserError,
} from "./../features/users/usersSlice";
import { clearCart } from "../features/cart/cartSlice";
import { clearWishlist } from "../features/wishlist/wishlistSlice";

function ProfileScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Selectors
    const userError = useSelector(selectUserError);
    const user = useSelector(selectUserDetails);

    // State
    const [error, setError] = useState("");

    function handleLogout() {
        dispatch(logoutUser());
        dispatch(clearCart());
        dispatch(clearWishlist());
        navigate("/");
    }

    function handleDelete() {
        dispatch(deleteUserProfile());
        navigate("/");
    }

    useEffect(() => {
        dispatch(clearError());
    }, []);

    useEffect(() => {
        if (userError) {
            setError(userError.response);
        }
    }, [userError]);

    useEffect(() => {
        if (userError) {
            if (userError.response === "user validation failed: email: Invalid email address.") {
                setError("Invalid email address");
            } else if (userError.response === "user validation failed: password: Password too short.") {
                setError("Password should contain atleast 6 characters");
            } else {
                setError(userError.response);
            }
        }
    }, [userError]);

    return (
        <div>
            <div className="user-profile">
                <h1>Account Information</h1>
                {Object.keys(user).length !== 0 && (
                    <>
                        <div className="user-changables">
                            <div className="user-info">
                                <UserInfo info={user.username} for={"Username"} />
                            </div>
                            <div className="user-info">
                                <UserInfo info={user.email} for={"Email"} />
                            </div>
                            <div className="user-info">
                                <UserInfo info={user.password} for={"Password"} />
                            </div>
                        </div>
                        <div className="error-centered">
                            {error && <span className="signup__alert__message">{error}</span>}
                        </div>
                        <div className="user-profile-buttons">
                            <button onClick={handleLogout}>LOGOUT</button>
                            <button onClick={handleDelete}>DELETE ACCOUNT</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default ProfileScreen;
