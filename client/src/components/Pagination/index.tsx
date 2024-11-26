import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

export type Props = {
    page: number;
    pages: number;
    onPageChange: (page: number) => void;
};

function Pagination({ page, pages, onPageChange }: Props) {
    return (
        <div>
            <ReactPaginate
                breakLabel="..."
                nextLabel={<FontAwesomeIcon icon={faChevronRight} />}
                // onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pages}
                previousLabel={<FontAwesomeIcon icon={faChevronLeft} />}
                containerClassName="flex flex-row items-center justify-center"
                pageClassName="hover:bg-[#F7C07E] w-10 h-10 flex items-center justify-center rounded-md mx-2"
                activeClassName="bg-[#8B4513] text-white"
            />
        </div>
    );
}

export default Pagination;
