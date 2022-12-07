// Modules
import { useState } from "react";
import { useDispatch } from "react-redux";

// Assets
import "../assets/css/userInfo.css";

// Redux
import { updatePassword, updateProfileInfo } from "../features/users/usersSlice";

function UserInfo(props) {
    const dispatch = useDispatch();
    const [editingMode, setEditingMode] = useState(false);
    const [inputText, setInputText] = useState(props.info);
    const [passwordInput, setPasswordInput] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });

    function handleEdit(event) {
        setInputText(event.target.value);
    }

    function handlePasswordEdit(event) {
        const { name, value } = event.target;
        setPasswordInput((prevPasswordInput) => ({
            ...prevPasswordInput,
            [name]: value,
        }));
    }

    function toggleButton() {
        if (editingMode) {
            const updates = {};
            if (props.for === "Password") {
                updates["password"] = passwordInput;
                dispatch(updatePassword(updates));
            } else {
                updates[props.for.toLowerCase()] = inputText;
                dispatch(updateProfileInfo(updates));
            }
        }
        setEditingMode((prevEditingMode) => !prevEditingMode);
    }

    function toggleCancel() {
        setEditingMode(false);
        setInputText(props.info);
        setPasswordInput({ currentPassword: "", newPassword: "", confirmPassword: "" });
    }

    function renderTextArea() {
        if (props.for === "Password") {
            return (
                <>
                    <input
                        type={"password"}
                        name={"currentPassword"}
                        value={passwordInput.currentPassword}
                        className="profile-text-input"
                        placeholder={`Current password`}
                        onChange={handlePasswordEdit}
                    />
                    <input
                        type={"password"}
                        name={"newPassword"}
                        value={passwordInput.newPassword}
                        className="profile-text-input"
                        placeholder={`New password`}
                        onChange={handlePasswordEdit}
                    />
                    <input
                        type={"password"}
                        name={"confirmPassword"}
                        value={passwordInput.confirmPassword}
                        className="profile-text-input"
                        placeholder={`Confirm password`}
                        onChange={handlePasswordEdit}
                    />
                </>
            );
        } else {
            return (
                <input
                    type={"text"}
                    value={inputText}
                    className="profile-text-input"
                    placeholder={`${props.for}`}
                    onChange={handleEdit}
                />
            );
        }
    }

    function isPassword() {
        if (props.for === "Password") {
            return "●●●●●●●●";
        } else {
            return props.info;
        }
    }

    return (
        <div className="user-info-content">
            <h3>
                <span>{props.for}</span>
                <div className="user-info-icons">
                    <span
                        className={`material-symbols-rounded profile-icon ${editingMode ? "edit" : ""}`}
                        onClick={toggleButton}
                    >
                        {editingMode ? "save" : "edit"}
                    </span>
                    <span className="material-symbols-rounded profile-icon" onClick={toggleCancel}>
                        {editingMode ? "close" : ""}
                    </span>
                </div>
            </h3>
            <p>{editingMode ? renderTextArea() : isPassword()}</p>
        </div>
    );
}

export default UserInfo;
