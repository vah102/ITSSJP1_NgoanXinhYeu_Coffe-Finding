import Tippy from "@tippyjs/react/headless";
import { useState } from "react";
import Popper from "../../components/Popper";
import PopperItem from "../../components/PopperItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownWideShort } from "@fortawesome/free-solid-svg-icons";
import Card from "../../components/Card";
import { useSearchContext } from "../../services/contexts/SearchContext";
import useFetch from "../../services/hooks/useFetch";

type Store = {
    store_id: string;
    name: string;
    address: string;
    logo: string;
    min_price: number;
    max_price: number;
    rate: number;
};

function Search() {
    const search = useSearchContext();

    const [sortOption, setSortOption] = useState("Highest rated");
    const [visible, setVisible] = useState(false);

    const queryParams = new URLSearchParams();
    queryParams.append("keyword", search.keyword || "");

    queryParams.append("sortOption", search.sort || "");
    queryParams.append("min_price", search.price.min_price.toString() || "");
    queryParams.append(
        "max_price",
        search.price.max_price !== Infinity
            ? search.price.max_price.toString()
            : ""
    );

    queryParams.append("style", search.styles.join(","));
    queryParams.append("feature", search.features.join(","));

    console.log(`http://localhost:3000/api/home/search-filter?${queryParams}`);

    const { data, loading } = useFetch<Store[]>(
        `http://localhost:3000/api/home/search-filter?${queryParams}`
    );
    // console.log(data)

    const handleToggleSort = () => {
        setVisible(!visible);
    };

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

export default Search;
