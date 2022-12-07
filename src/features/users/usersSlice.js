import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";

const initialState = {
    user: {},
    userStatus: "idle",
    userError: null,
};

// Async operations
export const fetchUser = createAsyncThunk("users/fetchUser", async (data, { rejectWithValue }) => {
    try {
        const response = await axios({
            method: "post",
            url: "https://i-games-backend.vercel.app/api/users/login",
            headers: {},
            data,
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const createAndFetchUser = createAsyncThunk("users/createAndFetchUser", async (data, { rejectWithValue }) => {
    try {
        const response = await axios({
            method: "post",
            url: "https://i-games-backend.vercel.app/api/users/register",
            data,
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const loadProfile = createAsyncThunk("users/loadProfile", async (_, { rejectWithValue }) => {
    try {
        const response = await axios({
            method: "get",
            url: "https://i-games-backend.vercel.app/api/users/me",
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const updateProfileInfo = createAsyncThunk("users/updateProfileInfo", async (data, { rejectWithValue }) => {
    try {
        const response = await axios({
            method: "patch",
            url: "https://i-games-backend.vercel.app/api/users/me",
            data,
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const updatePassword = createAsyncThunk("users/updatePassword", async (data, { rejectWithValue }) => {
    try {
        const response = await axios({
            method: "patch",
            url: "https://i-games-backend.vercel.app/api/users/me/password",
            data,
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const deleteUserProfile = createAsyncThunk("users/deleteUserProfile", async (_, { rejectWithValue }) => {
    try {
        const response = await axios({
            method: "delete",
            url: "https://i-games-backend.vercel.app/api/users/me",
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const addToWishlist = createAsyncThunk("users/addToWishlist", async (data, { rejectWithValue }) => {
    try {
        const response = await axios({
            method: "patch",
            url: "https://i-games-backend.vercel.app/api/users/wishlist/add",
            headers: {},
            data,
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const removeFromWishlist = createAsyncThunk("users/removeFromWishlist", async (data, { rejectWithValue }) => {
    try {
        const response = await axios({
            method: "patch",
            url: "https://i-games-backend.vercel.app/api/users/wishlist/remove",
            headers: {},
            data,
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const addToCart = createAsyncThunk("users/addToCart", async (data, { rejectWithValue }) => {
    try {
        const response = await axios({
            method: "patch",
            url: "https://i-games-backend.vercel.app/api/users/cart/add",
            headers: {},
            data,
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const removeFromCart = createAsyncThunk("users/removeFromCart", async (data, { rejectWithValue }) => {
    try {
        const response = await axios({
            method: "patch",
            url: "https://i-games-backend.vercel.app/api/users/cart/remove",
            headers: {},
            data,
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        clearError: (state) => {
            state.userError = {};
            state.userStatus = "idle";
        },
        logoutUser: (state) => {
            state.userStatus = "idle";
            state.user = {};
            localStorage.removeItem("TOKEN");
        },
    },
    extraReducers(builder) {
        builder
            // fetchUser Cases
            .addCase(fetchUser.pending, (state, action) => {
                return { ...initialState, userStatus: "loading" };
            })
            .addCase(fetchUser.rejected, (state, action) => {
                return { ...initialState, userStatus: "failed", userError: action.payload };
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                const { token } = action.payload;
                localStorage.setItem("TOKEN", token);
                setAuthToken(token);
                return { ...initialState, userStatus: "succeeded", user: action.payload.response };
            })
            // createAndFetchUser Cases
            .addCase(createAndFetchUser.pending, (state, action) => {
                return { ...state, userStatus: "loading" };
            })
            .addCase(createAndFetchUser.rejected, (state, action) => {
                return { ...state, userStatus: "failed", userError: action.payload };
            })
            .addCase(createAndFetchUser.fulfilled, (state, action) => {
                const { token } = action.payload;
                localStorage.setItem("TOKEN", token);
                setAuthToken(token);
                return { ...state, userStatus: "succeeded", user: action.payload.response };
            })
            // loadProfile Cases
            .addCase(loadProfile.pending, (state, action) => {
                return { ...state, userStatus: "loading" };
            })
            .addCase(loadProfile.rejected, (state, action) => {
                return { ...state, userStatus: "failed", userError: action.payload };
            })
            .addCase(loadProfile.fulfilled, (state, action) => {
                if (action.payload) {
                    return { ...state, userStatus: "succeeded", user: action.payload.response };
                }
                return { ...state, userStatus: "idle", user: {} };
            })
            // updateUserProfile Cases
            .addCase(updateProfileInfo.pending, (state, action) => {
                return { ...state, userStatus: "loading" };
            })
            .addCase(updateProfileInfo.rejected, (state, action) => {
                return { ...state, userStatus: "failed", userError: action.payload };
            })
            .addCase(updateProfileInfo.fulfilled, (state, action) => {
                return { ...state, userStatus: "succeeded", user: action.payload.response };
            })
            // updatePassword Cases
            .addCase(updatePassword.pending, (state, action) => {
                return { ...state, userStatus: "loading" };
            })
            .addCase(updatePassword.rejected, (state, action) => {
                return { ...state, userStatus: "failed", userError: action.payload };
            })
            .addCase(updatePassword.fulfilled, (state, action) => {
                return { ...state, userStatus: "succeeded" };
            })
            // deleteUserProfile Cases
            .addCase(deleteUserProfile.pending, (state, action) => {
                return { ...state, userStatus: "loading" };
            })
            .addCase(deleteUserProfile.rejected, (state, action) => {
                return { ...state, userStatus: "failed", userError: action.payload };
            })
            .addCase(deleteUserProfile.fulfilled, (state, action) => {
                return { ...state, userStatus: "idle", user: {} };
            })
            // addToWishlist Cases
            .addCase(addToWishlist.pending, (state, action) => {
                return { ...state, userStatus: "loading" };
            })
            .addCase(addToWishlist.rejected, (state, action) => {
                return { ...state, userStatus: "failed", userError: action.payload.response };
            })
            .addCase(addToWishlist.fulfilled, (state, action) => {
                return { ...state, userStatus: "succeeded", user: action.payload.response };
            })
            // removeFromWishlist Cases
            .addCase(removeFromWishlist.pending, (state, action) => {
                return { ...state, userStatus: "loading" };
            })
            .addCase(removeFromWishlist.rejected, (state, action) => {
                return { ...state, userStatus: "failed", userError: action.payload.response };
            })
            .addCase(removeFromWishlist.fulfilled, (state, action) => {
                return { ...state, userStatus: "succeeded", user: action.payload.response };
            })
            // addToCart Cases
            .addCase(addToCart.pending, (state, action) => {
                return { ...state, userStatus: "loading" };
            })
            .addCase(addToCart.rejected, (state, action) => {
                return { ...state, userStatus: "failed", userError: action.payload.response };
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                return { ...state, userStatus: "succeeded", user: action.payload.response };
            })
            // removeFromCart Cases
            .addCase(removeFromCart.pending, (state, action) => {
                return { ...state, userStatus: "loading" };
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                return { ...state, userStatus: "failed", userError: action.payload.response };
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                return { ...state, userStatus: "succeeded", user: action.payload.response };
            });
    },
});

// Selectors
export const selectUserDetails = (state) => state.users.user;
export const selectUserStatus = (state) => state.users.userStatus;
export const selectUserError = (state) => state.users.userError;

// Reducers
export const { clearError, logoutUser } = usersSlice.actions;

// Export reducer
export default usersSlice.reducer;
