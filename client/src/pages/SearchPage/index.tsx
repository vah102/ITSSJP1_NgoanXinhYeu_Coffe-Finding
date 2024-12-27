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
import { useTranslation } from "react-i18next";
type Store = {
    store_id: string;
    name: string;
    address: string;
    logo: string;
    min_price: number;
    max_price: number;
    rate: number;
    distance: number;
};

function SearchPage() {
    const{t}=useTranslation();
    const search = useSearchContext();
    const navigate = useNavigate();
    const [sortOption, setSortOption] = useState(t("home.rate"));
    const [visible, setVisible] = useState(false);

    // const savedQuery = localStorage.getItem("searchQuery");
    // if (savedQuery) {
    //     const params = new URLSearchParams(savedQuery);
    //     search.saveSearchValues(params.get("searchTerm") || "");
    //     search.saveSortValues(params.get("sortOrder") || "ASC");
    //     search.saveStyleValues(params.get("styles")?.split(",") || []);
    //     search.saveFeatureValues(params.get("features")?.split(",") || []);
    //     search.savePriceValues({
    //         min_price: params.get("minPrice")
    //             ? Number(params.get("minPrice"))
    //             : null,
    //         max_price: params.get("maxPrice")
    //             ? Number(params.get("maxPrice"))
    //             : null,
    //     });
    //     search.saveLocationValues({
    //         lat: params.get("latitude") ? Number(params.get("latitude")) : null,
    //         lon: params.get("longitude")
    //             ? Number(params.get("longitude"))
    //             : null,
    //     });
    //     search.saveQueryParam(savedQuery); // Đồng bộ giá trị từ localStorage vào trạng thái
    // }

    const params = new URLSearchParams();

    if (search.keyword) params.set("searchTerm", search.keyword);
    if (search.sortOrder) params.set("sortOrder", search.sortOrder);
    if (search.styles.length > 0) params.set("styles", search.styles.join(","));
    if (search.features.length > 0)
        params.set("features", search.features.join(","));
    if (search.price.min_price !== null)
        params.set("minPrice", search.price.min_price.toString());
    if (search.price.max_price !== null)
        params.set("maxPrice", search.price.max_price.toString());
    if (search.location.lat !== null)
        params.set("latitude", search.location.lat.toString());
    if (search.location.lon !== null)
        params.set("longitude", search.location.lon.toString());

    const queryString = params.toString();

    // if (queryString !== search.queryParam) {
    //     search.saveQueryParam(queryString); // Cập nhật trạng thái
    // }

    const { data, loading } = useFetch<Store[]>(
        `http://localhost:3000/api/home/search-filter?${queryString}`
    );

    const handleToggleSort = () => {
        setVisible(!visible);
    };

    const itemsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(0);

    const offset = currentPage * itemsPerPage;
    const currentItems = data && data.slice(offset, offset + itemsPerPage);
    const pageCount = data ? Math.ceil(data.length / itemsPerPage) : 1;

    const handlePageClick = (event: { selected: number }) => {
        setCurrentPage(event.selected);
    };

    return (
        <div className="w-full">
            <div className="w-full flex flex-row justify-between">
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
                                        setSortOption(t("home.rate"));
                                        search.saveSortValues("ASC");
                                        handleToggleSort();
                                    }}
                                >
                                    {t("home.rate")}
                                </PopperItem>
                                <PopperItem
                                    onClick={() => {
                                        setSortOption(t("home.location"));
                                        handleToggleSort();
                                        navigate(
                                            `/search?${search.queryParam}`
                                        );
                                    }}
                                >
                                    {t("home.location")}
                                </PopperItem>
                            </Popper>
                        </div>
                    )}
                >
                    <div
                        className="flex flex-row items-center gap-3 cursor-pointer"
                        onClick={handleToggleSort}
                    >
                        <div>{t("home.sort")}{sortOption}</div>
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
                            <Card key={item.store_id} item={item} />
                        ))}
                </div>
            )}
            <Pagination pages={pageCount} onPageChange={handlePageClick} />
        </div>
    );
}

export default SearchPage;
