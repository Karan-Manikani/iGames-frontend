// Modules
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Assets
import "../assets/css/loginScreen.css";

// Redux
import { clearError } from "../features/users/usersSlice";
import { fetchUser } from "../features/users/usersSlice";
import { selectUserStatus, selectUserError } from "./../features/users/usersSlice";

function LoginScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Selectors
    const userError = useSelector(selectUserError);
    const userStatus = useSelector(selectUserStatus);

    // State
    const [error, setError] = useState("");
    const [userDetails, setUserDetails] = useState({ email: "", password: "" });

    function handleChange(event) {
        const { name, value } = event.target;
        setUserDetails((prevUserDetails) => ({
            ...prevUserDetails,
            [name]: value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        dispatch(fetchUser({ email: userDetails.email, password: userDetails.password }));
    }

    useEffect(() => {
        dispatch(clearError());
    }, []);

    useEffect(() => {
        if (userStatus === "succeeded") {
            navigate(-1);
        }
    }, [userStatus]);

    useEffect(() => {
        if (userError) {
            setError(userError.response);
        }
    }, [userError]);

    const canSignIn = userDetails.email.length !== 0 && userDetails.password.length !== 0;
    return (
        <div className="signin__portal">
            <h1>Sign In</h1>
            <form className="signin__form" onSubmit={handleSubmit}>
                <input
                    type={"email"}
                    name="email"
                    className="signin__form__input"
                    placeholder="Email Address"
                    onChange={handleChange}
                />
                <input
                    type={"password"}
                    name="password"
                    className="signin__form__input"
                    placeholder="Password"
                    onChange={handleChange}
                />
                <button className="signin__button" type="submit" disabled={!canSignIn}>
                    Sign In
                </button>
                <p className="account__setup">
                    Don't have an account?{" "}
                    <Link to={"/register"} className="signup__link">
                        Register Now
                    </Link>
                </p>
                {error && <span className="signup__alert__message">{error}</span>}
            </form>
        </div>
    );
}

export default LoginScreen;
