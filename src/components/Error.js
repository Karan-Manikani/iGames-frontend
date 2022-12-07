// Assets
import "../assets/css/error.css";

function Error(props) {
    return (
        <div className="error">
            <h3>Something went wrong ¯\_(ツ)_/¯</h3>
            <h1 className="error-code">{props.code}</h1>
            <p className="error-message">{props.message}</p>
        </div>
    );
}

export default Error;
