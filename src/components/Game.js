// Modules
import parse from "html-react-parser";
import { Link } from "react-router-dom";

// Assets
import "../assets/css/game.css";
import xboxIcon from "../assets/images/xbox.svg";
import windowsIcon from "../assets/images/windows.svg";
import playstationIcon from "../assets/images/playstation.svg";

function Game(props) {
    function renderPlatforms() {
        let list = ``;
        props.platforms.forEach((platform) => {
            if (platform === "PC") {
                list += `<li><img src=${windowsIcon} alt="game-cover" className="platform-logo" /></li>`;
            } else if (platform === "Xbox") {
                list += `<li><img src=${xboxIcon} alt="game-cover" className="platform-logo" /></li>`;
            } else if (platform === "Playstation") {
                list += `<li><img src=${playstationIcon} alt="game-cover" className="platform-logo" /></li>`;
            }
        });
        return list;
    }
    return (
        <div className="game">
            <Link to={`/games/${props._id}`}>
                <div className="game-banner-container">
                    <img src={props.images[0]} alt="game-cover" className="game-banner" />
                </div>
            </Link>
            <Link to={`/games/${props._id}`} className="game-title-link">
                <h3 className="game-title">{props.name}</h3>
            </Link>
            <p className="game-desc">{props.description}</p>
            <div className="game-details">
                <p className="price">{props.price === 0 ? "Free" : `$${props.price}`}</p>
                <div className="platforms">
                    <ul>{parse(renderPlatforms())}</ul>
                </div>
            </div>
        </div>
    );
}

export default Game;
