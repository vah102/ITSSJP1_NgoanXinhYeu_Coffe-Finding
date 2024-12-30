import { useState } from "react";
import Card from "../../components/Card";
import useFetch from "../../services/hooks/useFetch";
import Pagination from "../../components/Pagination";
import { useSearchContext } from "../../services/contexts/SearchContext";
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

    const search = useSearchContext();

    const { data, loading } = useFetch<Store[]>(
        `http://localhost:3000/api/home/stores?latitude=${search.location.lat}&longitude=${search.location.lon}`
    );
    // console.log(data);

    const itemsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(0);

    // Tính toán dữ liệu hiển thị
    const offset = currentPage * itemsPerPage;
    const currentItems = data && data.slice(offset, offset + itemsPerPage);
    const pageCount = data ? Math.ceil(data.length / itemsPerPage) : 1;

    // Hàm xử lý khi chuyển trang
    const handlePageClick = (event: { selected: number }) => {
        setCurrentPage(event.selected);
    };

    return (
        <div className="w-full">
            <div className="w-full flex flex-row justify-between ">
                <h2 className="text-4xl font-bold">{t("home.trending")}</h2>
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
