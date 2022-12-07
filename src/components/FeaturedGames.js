// Modules
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Components
import Carousel from "react-bootstrap/Carousel";
import Error from "../components/Error";

// Assets
import "bootstrap/dist/css/bootstrap.css";
import "../assets/css/featuredGames.css";

// Redux
import {
    selectAllFeaturedGames,
    fetchFeaturedGames,
    getFeaturedGamesStatus,
    getFeaturedGamesError,
} from "../features/featured-games/featuredGamesSlice";

function FeaturedGames() {
    const dispatch = useDispatch();
    const featuredGames = useSelector(selectAllFeaturedGames);
    const featuredGamesStatus = useSelector(getFeaturedGamesStatus);
    const featuredGamesError = useSelector(getFeaturedGamesError);

    useEffect(() => {
        dispatch(fetchFeaturedGames());
    }, [dispatch]);

    function renderFeaturedGames() {
        return featuredGames.response.map((game) => {
            return (
                <Carousel.Item interval={5000} key={game._id}>
                    <Link to={`/games/${game._id}`} className="link">
                        <img className="featured-game-banner" src={game.images[0]} alt="First slide" />
                        <Carousel.Caption>
                            <h3 className="featured-game-name">{game.name}</h3>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            );
        });
    }

    switch (featuredGamesStatus) {
        case "loading":
            return <p></p>;
        case "failed":
            return <Error code={featuredGamesError.statusCode} message={featuredGamesError.message} />;
        case "succeeded":
            return <Carousel fade>{renderFeaturedGames()}</Carousel>;
        default:
            return;
    }
}

export default FeaturedGames;
