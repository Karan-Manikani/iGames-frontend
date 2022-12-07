import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Assets
import "../assets/css/registerScreen.css";

// Redux
import { clearError, createAndFetchUser } from "../features/users/usersSlice";
import { selectUserStatus, selectUserError } from "./../features/users/usersSlice";

function RegisterScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userStatus = useSelector(selectUserStatus);
    const userError = useSelector(selectUserError);

    const [error, setError] = useState("");
    const [userDetails, setUserDetails] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setUserDetails((prevUsersDetails) => ({
            ...prevUsersDetails,
            [name]: value,
        }));
    }

    function missingDetails() {
        return Object.values(userDetails).some((value) => value === null || value === "");
    }

    function passwordsMatch() {
        return userDetails.password === userDetails.confirmPassword;
    }

    function canCreateAccount() {
        return !missingDetails() && passwordsMatch();
    }

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(
            createAndFetchUser({
                username: userDetails.username,
                email: userDetails.email,
                password: userDetails.password,
            })
        );
    }

    useEffect(() => {
        dispatch(clearError());
    }, []);

    useEffect(() => {
        if (userStatus === "succeeded") {
            navigate(-2);
        }
    }, [userStatus]);

    useEffect(() => {
        if (!passwordsMatch()) {
            setError("Passwords don't match");
        } else {
            setError("");
        }
    }, [userDetails.password, userDetails.confirmPassword]);

    useEffect(() => {
        if (userError) {
            if (userError.response === "user validation failed: email: Invalid email address.") {
                setError("Invalid email address");
            } else if (userError.response === "user validation failed: password: Password too short.") {
                setError("Password should contain atleast 6 characters");
            } else if (
                userError.response ===
                "user validation failed: email: Invalid email address., password: Password too short."
            ) {
                setError("Invalid email address and password too short");
            } else {
                setError(userError.response);
            }
        }
    }, [userError]);

    return (
        <div className="signup__portal">
            <h1>Sign Up</h1>
            <form className="signup__form" onSubmit={handleSubmit}>
                <input
                    type={"text"}
                    name="username"
                    className="signup__form__input"
                    placeholder="Username"
                    onChange={handleChange}
                    autoComplete="off"
                />
                <input
                    type={"email"}
                    name="email"
                    className="signup__form__input"
                    placeholder="Email Address"
                    onChange={handleChange}
                />
                <input
                    type={"password"}
                    name="password"
                    className="signup__form__input"
                    placeholder="Password"
                    onChange={handleChange}
                />
                <input
                    type={"password"}
                    name="confirmPassword"
                    className="signup__form__input"
                    placeholder="Retype Password"
                    onChange={handleChange}
                />
                <button className="signup__button" type="submit" disabled={!canCreateAccount()}>
                    Create Account
                </button>
                {error && <span className="signup__alert__message">{error}</span>}
            </form>
        </div>
    );
}

export default RegisterScreen;
