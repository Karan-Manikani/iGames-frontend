import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./app/store";
import { Provider } from "react-redux";
import { loadProfile } from "./features/users/usersSlice";
import setAuthToken from "./utils/setAuthToken";

const root = ReactDOM.createRoot(document.getElementById("root"));

if (localStorage.TOKEN) {
    const token = localStorage.TOKEN;
    setAuthToken(token);
    store.dispatch(loadProfile());
}

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
