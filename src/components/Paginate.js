// Modules
import { useDispatch, useSelector } from "react-redux";

// Assets
import "../assets/css/paginate.css";

// Redux
import { getPageNumber, getTotalPages, nextPage, prevPage } from "../features/games/gamesSlice";

function Paginate() {
    const dispatch = useDispatch();
    const page = useSelector(getPageNumber);
    const totalPages = useSelector(getTotalPages);

    function handlePrev() {
        if (page !== 1) {
            dispatch(prevPage());
        }
    }

    function handleNext() {
        if (page !== totalPages) {
            dispatch(nextPage());
        }
    }

    return (
        <div className="paginate">
            <span className={`material-symbols-rounded ${page === 1 ? "disabled" : "prev"}`} onClick={handlePrev}>
                navigate_before
            </span>
            <span className="page-number">{page}</span>
            <span class={`material-symbols-rounded ${page === totalPages ? "disabled" : "next"}`} onClick={handleNext}>
                navigate_next
            </span>
        </div>
    );
}

export default Paginate;
