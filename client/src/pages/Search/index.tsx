import Tippy from "@tippyjs/react/headless";
import { useState } from "react";
import Popper from "../../components/Popper";
import PopperItem from "../../components/PopperItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowDownWideShort,
    faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import Card from "../../components/Card";
import { useSearchContext } from "../../services/contexts/SearchContext";
import useFetch from "../../services/hooks/useFetch";
import styles from "./Search.module.css";
import classNames from "classnames/bind";
import Button from "../../components/Button";
import PriceFilter from "../../components/PriceFilter";
import FeatureFilter from "../../components/FeatureFilter";
import StyleFilter from "../../components/StyleFilter";

const cx = classNames.bind(styles);

type Store = {
    _id: string;
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
    const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
    const [selectedPrice, setSelectedPrice] = useState<{
        min_price: number;
        max_price: number;
    }>({
        min_price: 0,
        max_price: 100000,
    });

    const queryParams = new URLSearchParams();
    queryParams.append("keyword", search.keyword || "");

    queryParams.append("sortOption", search.sort || "");
    queryParams.append("min_price", selectedPrice.min_price.toString() || "");
    queryParams.append("max_price", selectedPrice.max_price !== Infinity? selectedPrice.max_price.toString() : "");

    queryParams.append("style", selectedStyles.join(","));
    queryParams.append("feature", selectedFeatures.join(","));

    console.log(`http://localhost:3000/api/home/search-filter?${queryParams}`);

    const { data, loading } = useFetch<Store[]>(
        `http://localhost:3000/api/home/search-filter?${queryParams}`
    );
    // console.log(data)

    const handleToggleSort = () => {
        setVisible(!visible);
    };

    const handleStylesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const style = event.target.value;

        setSelectedStyles((prevStyles) =>
            event.target.checked
                ? [...prevStyles, style]
                : prevStyles.filter((prevStyle) => prevStyle !== style)
        );
    };

    const handleFeaturesChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const feature = event.target.value;

        setSelectedFeatures((prevFeatures) =>
            event.target.checked
                ? [...prevFeatures, feature]
                : prevFeatures.filter((item) => item !== feature)
        );
    };

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const priceArr = event.target.value.split("-");
        const price = {
            min_price: parseInt(priceArr[0]),
            max_price: priceArr[1] === 'Infinity' ? Infinity : parseInt(priceArr[1]),
        };
        console.log(price)
        setSelectedPrice(price);
    };

    const handleClearFilter = () => {
        console.log("clear");
        setSelectedStyles([]);
        setSelectedFeatures([]);
    };

    return (
        <div className="p-10 flex flex-row gap-10">
            <div className={cx("filter")}>
                <div className="w-full flex flex-row items-center justify-between">
                    <h2 className="text-3xl font-bold">Filter</h2>
                    <Button
                        onClick={handleClearFilter}
                        icon={<FontAwesomeIcon icon={faRotateRight} />}
                    >
                        Clear Filters
                    </Button>
                </div>
                <PriceFilter
                    selectedPrice={selectedPrice}
                    onChange={handlePriceChange}
                />
                <StyleFilter
                    selectedStyles={selectedStyles}
                    onChange={handleStylesChange}
                />
                <FeatureFilter
                    selectedFeatures={selectedFeatures}
                    onChange={handleFeaturesChange}
                />
            </div>
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
                                            search.saveSortValues(
                                                "highest_rated"
                                            );
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
        </div>
    );
}

export default Search;
