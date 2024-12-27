import Tippy from "@tippyjs/react/headless";
import { useEffect, useState } from "react";
import Popper from "../../components/Popper";
import PopperItem from "../../components/PopperItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownWideShort } from "@fortawesome/free-solid-svg-icons";
import Card from "../../components/Card";
import useFetch from "../../services/hooks/useFetch";
import Pagination from "../../components/Pagination";
import { useSearchContext } from "../../services/contexts/SearchContext";
import { useNavigate } from "react-router-dom";
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

function Home() {
    const { t } = useTranslation();
    const [sortOption, setSortOption] = useState("");
    const [visible, setVisible] = useState(false);

    const search = useSearchContext();
    const navigate = useNavigate();

    const handleToggleSort = () => {
        setVisible(!visible);
    };

    const { data, loading } = useFetch<Store[]>(
        `http://localhost:3000/api/home/stores`
    );
    console.log(data);

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
                <h2 className="text-4xl font-bold">{t("home.trending")}</h2>
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
                                        navigate(`/search`);
                                    }}
                                >
                                    {t("home.rate")}
                                </PopperItem>
                                <PopperItem
                                    onClick={() => {
                                        setSortOption(t("home.location"));
                                        handleToggleSort();
                                        navigate(`/search`);
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

export default Home;
