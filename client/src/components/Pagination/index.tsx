import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function Pagination() {
    return (
        <div>
            <ReactPaginate
                breakLabel="..."
                nextLabel={<FontAwesomeIcon icon={faChevronRight} />}
                // onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={5}
                previousLabel={<FontAwesomeIcon icon={faChevronLeft} />}
                containerClassName="flex flex-row items-center justify-center"
                pageClassName="block border- border-solid border-lightGray hover:bg-lightGray w-10 h-10 flex items-center justify-center rounded-md"
            />
        </div>
    );
}

export default Pagination;
