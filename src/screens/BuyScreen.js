import { useNavigate } from "react-router-dom";
import "../assets/css/buyScreen.css";

function BuyScreen() {
    const navigate = useNavigate();
    return (
        <div className="no-results">
            <h1>Coming soon!</h1>
            <p className="no-results-message-buy" onClick={() => navigate("/games")}>
                Browse Games
            </p>
        </div>
    );
}

export default BuyScreen;
