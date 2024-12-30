import Tippy from "@tippyjs/react/headless";
import { useEffect, useState } from "react";
import Popper from "../../components/Popper";
import PopperItem from "../../components/PopperItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownWideShort } from "@fortawesome/free-solid-svg-icons";
import Card from "../../components/Card";
import { useSearchContext } from "../../services/contexts/SearchContext";
import useFetch from "../../services/hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
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
    const { t } = useTranslation();
    const storedData = localStorage.getItem("searchContext");
    console.log(storedData);
    const search = useSearchContext();
    const [sortOption, setSortOption] = useState(t("home.rate"));
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const queryParams = new URLSearchParams(search.queryParam);
        switch (sortOption) {
            case t("home.rate"):
                console.log(1)
                queryParams.set("sortOrder", "rate");
                search.saveQueryParam(queryParams.toString());
                break;
            case t("home.location"):
                console.log(2)
                queryParams.set("sortOrder", "distance");
                search.saveQueryParam(queryParams.toString());
                break;
            default:
                break;
        }
    }, [sortOption]);

    const { data, loading, reFetch } = useFetch<Store[]>(
        `http://localhost:3000/api/home/search-filter?${search.queryParam}`
    );

    useEffect(() => {
        reFetch();
        console.log(
            `http://localhost:3000/api/home/search-filter?${search.queryParam}`
        );
        console.log(data);
    }, [search]);

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
                    <h2 className="text-4xl font-bold">{t("home.no_item")}</h2>
                ) : (
                    <h2 className="text-4xl font-bold">
                        {data && data.length > 0
                            ? `${t("home.result")} ${data.length} ${t(
                                  "home.item"
                              )}`
                            : t("home.no_item")}
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
                                        handleToggleSort();
                                    }}
                                >
                                    {t("home.rate")}
                                </PopperItem>
                                <PopperItem
                                    onClick={() => {
                                        setSortOption(t("home.location"));
                                        handleToggleSort();
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
                        <div>
                            {t("home.sort")}
                            {sortOption}
                        </div>
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
