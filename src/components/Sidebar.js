import "../assets/css/sidebar.css";
import { useState } from "react";

function Sidebar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    function toggleSidebar() {
        setSidebarOpen((prevSidebarOpen) => !prevSidebarOpen);
    }

    return (
        <div className="sidebar">
            {sidebarOpen ? (
                <span className="material-symbols-rounded hamburger-menu" onClick={toggleSidebar}>
                    close
                </span>
            ) : (
                <span className="material-symbols-rounded hamburger-menu" onClick={toggleSidebar}>
                    menu
                </span>
            )}

            <div className={`sidebar-contents ${sidebarOpen ? "open" : "close"}`}>
                <div className="sidebar-cart-links">
                    <span className="sidebar-wishlist">Wishlist</span>
                    <hr style={{ color: "gray", height: "3px", width: "100%", margin: 0 }} />
                    <span className="sidebar-cart">Cart</span>
                </div>
                <div className="sidebar-signin">
                    <span className="material-symbols-rounded sidebar-person">person</span>
                    <span className="sidebar-username">Sign In</span>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
