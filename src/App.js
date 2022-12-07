// Modules
import { Route, Routes, BrowserRouter } from "react-router-dom";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";

// Screens
import BuyScreen from "./screens/BuyScreen";
import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ProductScreen from "./screens/ProductScreen";
import RegisterScreen from "./screens/RegisterScreen";
import WishlistScreen from "./screens/WishlistScreen";
import BrowseGamesScreen from "./screens/BrowseGamesScreen";

// Assets
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <div className="main-wrapper">
                <main>
                    <Header />
                    <Sidebar />
                    <Routes>
                        <Route path="/" element={<HomeScreen />} />
                        <Route path="/games" element={<BrowseGamesScreen />} />
                        <Route path="/games/:id" element={<ProductScreen />} />
                        <Route path="/wishlist" element={<WishlistScreen />} />
                        <Route path="/cart" element={<CartScreen />} />
                        <Route path="/register" element={<RegisterScreen />} />
                        <Route path="/login" element={<LoginScreen />} />
                        <Route path="/me" element={<ProfileScreen />} />
                        <Route path="/checkout" element={<BuyScreen />} />
                    </Routes>
                </main>
                <div className="main-footer">
                    <Footer />
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
