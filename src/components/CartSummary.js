// Modules
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Assets
import "../assets/css/cartSummary.css";

// Redux
import { selectCartTotal } from "../features/cart/cartSlice";

function CartSummary() {
    const cartTotal = useSelector(selectCartTotal);
    const navigate = useNavigate();

    return (
        <div className="cart-summary">
            <h3>Summary</h3>
            <div className="cart-split-info">
                <span>Total</span>
                <span>$ {cartTotal.toFixed(2)}</span>
            </div>
            <div className="cart-split-info">
                <span>Taxes</span>
                <span>Calculated at Checkout</span>
            </div>
            <hr />
            <div className="cart-split-info">
                <span>Subtotal</span>
                <span>$ {cartTotal.toFixed(2)}</span>
            </div>
            <button onClick={() => navigate("/checkout")}>CHECK OUT</button>
        </div>
    );
}

export default CartSummary;
