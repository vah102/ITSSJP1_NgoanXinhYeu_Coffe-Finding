import Tippy from "@tippyjs/react/headless";
import { useState } from "react";
import Popper from "../../components/Popper";
import PopperItem from "../../components/PopperItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownWideShort } from "@fortawesome/free-solid-svg-icons";
import Card from "../../components/Card";
import useFetch from "../../services/hooks/useFetch";
import { useSearchContext } from "../../services/contexts/SearchContext";

type Store = {
    _id: string;
    name: string;
    address: string;
    logo: string;
    min_price: number;
    max_price: number;
    rate: number;
};

function Home() {
    const search = useSearchContext();

    const [sortOption, setSortOption] = useState("Highest rated");
    const [visible, setVisible] = useState(false);

    const handleToggleSort = () => {
        setVisible(!visible);
    };

    const { data, loading } = useFetch<Store[]>(
        `http://localhost:3000/api/home/sort-rate`
    );

    console.log(data);

    return (
        <div className="w-full">
            <div className="w-full flex flex-row justify-between ">
                <h2 className="text-4xl font-bold">Trending this week</h2>
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
                                        search.saveSortValues("highest_rated");
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
                    {data &&
                        data.map((item, index) => (
                            <Card key={index} item={item} />
                        ))}
                </div>
            )}
            {/* <Pagination/> */}
        </div>
    );
}

export default Home;
