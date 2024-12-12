import Tippy from "@tippyjs/react/headless";
import { useEffect, useState } from "react";
import Popper from "../../components/Popper";
import PopperItem from "../../components/PopperItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownWideShort } from "@fortawesome/free-solid-svg-icons";
import Card from "../../components/Card";
import { useSearchContext } from "../../services/contexts/SearchContext";
import useFetch from "../../services/hooks/useFetch";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";

type Store = {
    _id: string;
    name: string;
    address: string;
    logo: string;
    min_price: number;
    max_price: number;
    rate: number;
};

function SearchPage() {
    const search = useSearchContext();
    const navigate = useNavigate();

    const [sortOption, setSortOption] = useState("Highest rated");
    const [visible, setVisible] = useState(false);

    // Đồng bộ hóa queryParam khi state thay đổi
    useEffect(() => {
        const params = new URLSearchParams();

        if (search.keyword) params.set("searchTerm", search.keyword);
        // if (search.sort) params.set("sort", search.sort);
        if (search.styles.length > 0) params.set("styles", search.styles.join(","));
        if (search.features.length > 0) params.set("features", search.features.join(","));
        if (search.price.min_price !== undefined)
            params.set("minPrice", search.price.min_price.toString());
        if (search.price.max_price !== undefined && search.price.max_price !== Infinity) {
            params.set("maxPrice", search.price.max_price.toString());
        }

        search.saveQueryParam(params.toString());
        navigate(`/search?${search.queryParam}`);
    }, [search]);

    console.log(`http://localhost:3000/api/home/search-filter?${search.queryParam}`);

    const { data, loading } = useFetch<Store[]>(
        `http://localhost:3000/api/home/search-filter?${search.queryParam}`
    );
    // console.log(data)

    const handleToggleSort = () => {
        setVisible(!visible);
    };

    const itemsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(0);

    // Tính toán dữ liệu hiển thị
    const offset = currentPage * itemsPerPage;
    const currentItems = data && data.slice(offset, offset + itemsPerPage);
    const pageCount = data ? Math.ceil(data.length / itemsPerPage) : 1;

    console.log(currentItems);

    // Hàm xử lý khi chuyển trang
    const handlePageClick = (event: { selected: number }) => {
        setCurrentPage(event.selected);
    };

    return (
        <div className="w-full">
            <div className="w-full flex flex-row justify-between ">
                {loading ? (
                    <h2 className="text-4xl font-bold">No item founded</h2>
                ) : (
                    <h2 className="text-4xl font-bold">
                        Result : {data && data.length} items founded
                    </h2>
                )}
                <Tippy
                    visible={visible}
                    onClickOutside={() => setVisible(false)}
                    placement="bottom-end"
                    interactive
                    render={(attrs) => (
                        <div tabIndex={-1} {...attrs}>
                            <Popper>
                                <PopperItem
                                    onClick={() => {
                                        // search.saveSortValues("highest_rated");
                                        handleToggleSort();
                                    }}
                                >
                                    Highest rated
                                </PopperItem>
                                <PopperItem
                                    onClick={() => {
                                        setSortOption("Nearest location");
                                        handleToggleSort();
                                    }}
                                >
                                    Nearest location
                                </PopperItem>
                            </Popper>
                        </div>
                    )}
                >
                    <div
                        className="flex flex-row items-center gap-3 cursor-pointer"
                        onClick={handleToggleSort}
                    >
                        <div>Sort by {sortOption}</div>
                        <FontAwesomeIcon icon={faArrowDownWideShort} />
                    </div>
                </Tippy>
            </div>
            {loading ? (
                "Loading please wait"
            ) : (
                <div className="p-10 flex flex-wrap gap-10">
                    {currentItems &&
                        currentItems.map((item) => (
                            <Card key={item._id} item={item} />
                        ))}
                </div>
            )}
            <Pagination pages={pageCount} onPageChange={handlePageClick} />
        </div>
    );
}

export default SearchPage;
