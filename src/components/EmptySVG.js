// Modules
import { Link } from "react-router-dom";

// Assets
import "../assets/css/emptySVG.css";

function EmptySVG(props) {
    return (
        <div className="centered">
            <div className="not-logged-in-view-cart">
                <svg className="svg" viewBox="0 0 45 52">
                    <g fill="none" fillRule="evenodd">
                        <path
                            d="M4.058 0C1.094 0 0 1.098 0 4.075v35.922c0 .338.013.65.043.94.068.65-.043 1.934 2.285 2.96 1.553.683 7.62 3.208 18.203 7.573 1.024.428 1.313.529 2.081.529.685.013 1.137-.099 2.072-.53 10.59-4.227 16.66-6.752 18.213-7.573 2.327-1.23 2.097-3.561 2.097-3.899V4.075C44.994 1.098 44.13 0 41.166 0H4.058z"
                            fill="#2a2a2a"
                        ></path>
                        <path
                            stroke="#FFF"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14 18l4.91 2.545-2.455 4M25.544 28.705c-1.056-.131-1.806-.14-2.25-.025-.444.115-1.209.514-2.294 1.197M29.09 21.727L25 19.5l2.045-3.5"
                        ></path>
                    </g>
                </svg>
                <h2>{props.message}</h2>
                <Link to={props.link} style={{ textDecoration: "none" }} className="svg-link">
                    {props.linkTxt}
                </Link>
            </div>
        </div>
    );
}

export default EmptySVG;
