// Modules
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

// Assets
import "../assets/css/product.css";
import "bootstrap/dist/css/bootstrap.css";
import xboxIcon from "../assets/images/xbox.svg";
import playstationIcon from "../assets/images/playstation.svg";
import windowsIcon from "../assets/images/windows.svg";

// Components
import Error from "../components/Error";

// Redux
import { addToCart, removeFromCart, selectUserDetails } from "../features/users/usersSlice";
import { addToWishlist, removeFromWishlist } from "../features/users/usersSlice";
import { getProduct, getProductStatus, getProductError, fetchProductByID } from "../features/product/productSlice";

function ProductScreen() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Selectors
    const product = useSelector(getProduct);
    const user = useSelector(selectUserDetails);
    const productError = useSelector(getProductError);
    const productStatus = useSelector(getProductStatus);

    // States
    const [width, setWidth] = useState(window.innerWidth);
    const [cartButtonText, setCartButtonText] = useState("ADD TO CART");
    const [gameInCart, setGameInCart] = useState(Object.keys(user).length !== 0 && user.cart.includes(id));
    const [wishlistButtonText, setWishlistButtonText] = useState("ADD TO WISHLIST");
    const [gameInWishlist, setGameInWishlist] = useState(Object.keys(user).length !== 0 && user.wishlist.includes(id));

    useEffect(() => {
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    useEffect(() => {
        dispatch(fetchProductByID(id));
        renderWishlistBtn();
        renderCartBtn();
    }, [dispatch, id]);

    function updateWidth() {
        setWidth(window.innerWidth);
    }

    function handleWishlistRequest() {
        if (Object.keys(user).length === 0) {
            return navigate("/login");
        } else if (Object.keys(user).length !== 0 && user.wishlist.includes(id)) {
            dispatch(removeFromWishlist({ gameId: id }));
            setWishlistButtonText("ADD TO WISHLIST");
            setGameInWishlist(false);
        } else {
            dispatch(addToWishlist({ gameId: id }));
            setWishlistButtonText("REMOVE FROM WISHLIST");
            setGameInWishlist(true);
        }
    }

    function handleCartRequest() {
        if (Object.keys(user).length === 0) {
            return navigate("/login");
        } else if (gameInCart) {
            dispatch(removeFromCart({ gameId: id, userId: user._id }));
            setCartButtonText("ADD TO CART");
            setGameInCart(false);
        } else {
            dispatch(addToCart({ gameId: id, userId: user._id }));
            setCartButtonText("REMOVE FROM CART");
            setGameInCart(true);
        }
    }

    function renderPlatforms() {
        let list = ``;
        product.response.platforms.forEach((platform) => {
            if (platform === "PC") {
                list += `<li><img src=${windowsIcon} alt="game-cover" className="product-platform-logo" /></li>`;
            } else if (platform === "Xbox") {
                list += `<li><img src=${xboxIcon} alt="game-cover" className="product-platform-logo" /></li>`;
            } else if (platform === "Playstation") {
                list += `<li><img src=${playstationIcon} alt="game-cover" className="product-platform-logo" /></li>`;
            }
        });
        return list;
    }

    function renderImages() {
        return product.response.images.map((image) => {
            return (
                <Carousel.Item interval={5000} key={image}>
                    <img className="product-banner" src={image} alt="First slide" />
                </Carousel.Item>
            );
        });
    }

    function renderWishlistBtn() {
        if (gameInWishlist) {
            setWishlistButtonText("REMOVE FROM WISHLIST");
        }
    }

    function renderCartBtn() {
        if (gameInCart) {
            setCartButtonText("REMOVE FROM CART");
        }
    }

    switch (productStatus) {
        case "loading":
            return <p></p>;
        case "failed":
            return <Error code={productError.statusCode} message={productError.response} />;
        case "succeeded":
            return (
                <div className="product">
                    <div className="product-header">
                        <h1>{product.response.name}</h1>
                        <Link to={"/games"} className="product-header-browse">
                            Browse Games
                        </Link>
                    </div>
                    <div className="carousel-info">
                        <Carousel fade className="render-images">
                            {renderImages()}
                        </Carousel>
                        <div className="cart-game-info">
                            {width > 1000 && (
                                <h3 className="game-price">
                                    {product.response.price === 0 ? "Free" : `$ ${product.response.price}`}
                                </h3>
                            )}
                            <div className="cart-actions">
                                {width >= 1000 ? (
                                    <button onClick={() => navigate("/checkout")}>BUY</button>
                                ) : (
                                    <button onClick={() => navigate("/checkout")}>
                                        BUY FOR ${product.response.price}
                                    </button>
                                )}
                                <button onClick={handleCartRequest}>{cartButtonText}</button>
                                <button onClick={handleWishlistRequest}>{wishlistButtonText}</button>
                            </div>
                            <div className="game-info">
                                <div className="split-info">
                                    <span>Release Date</span>
                                    <span>{product.response.releaseDate}</span>
                                </div>
                                <div className="split-info">
                                    <span>Metacritic Rating</span>
                                    <span>{product.response.metacriticRating}</span>
                                </div>
                                <div className="split-info">
                                    <span>Platforms</span>
                                    <div className="product-platforms">
                                        <ul>{parse(renderPlatforms())}</ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="videos-desc">
                        <div className="genres-desc">
                            <p className="product-description">{product.response.description}</p>
                            <p className="genres">
                                <span style={{ color: "white" }}>Genres</span>
                                <br />
                                {product.response.genres.join(", ")}
                            </p>
                        </div>
                        <div className="videos">
                            <button onClick={(e) => (window.location.href = product.response.videos[0])}>
                                Watch Trailer
                            </button>
                            <button onClick={(e) => (window.location.href = product.response.videos[1])}>
                                Watch Gameplay
                            </button>
                        </div>
                    </div>
                </div>
            );
        default:
            break;
    }
}

export default ProductScreen;
