import React from "react";
import FeaturedGames from "../components/FeaturedGames";
import SearchLinks from "../components/SearchLinks";
import "../assets/css/homeScreen.css";

function HomeScreen() {
    return (
        <div className="home">
            <div className="home-screen-search">
                <SearchLinks hideBrowse={false} screen="Games" hideSearch={true} />
            </div>
            <FeaturedGames />
        </div>
    );
}

export default HomeScreen;
