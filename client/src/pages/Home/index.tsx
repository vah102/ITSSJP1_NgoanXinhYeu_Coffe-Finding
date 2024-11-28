import classNames from "classnames/bind";
import styles from "./Home.module.css";
import Tippy from "@tippyjs/react/headless";
import { useState } from "react";
import Popper from "../../components/Popper";
import PopperItem from "../../components/PopperItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownWideShort, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import Card from "../../components/Card";
import useFetch from "../../services/hooks/useFetch";
import Button from "../../components/Button";
import FeatureFilter from "../../components/FeatureFilter";
import PriceFilter from "../../components/PriceFilter";
import StyleFilter from "../../components/StyleFilter";
import { useSearchContext } from "../../services/contexts/SearchContext";
import { useNavigate } from "react-router-dom";

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

function Home() {
    const search = useSearchContext();
    const navigate = useNavigate();

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
        navigate("/search")
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
        navigate("/search")
    };

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const priceArr = event.target.value.split("-");
        const price = {
            min_price: parseInt(priceArr[0]),
            max_price: priceArr[1] === 'Infinity' ? Infinity : parseInt(priceArr[1]),
        };
        console.log(price)
        setSelectedPrice(price);
        navigate("/search")
    };

    const handleClearFilter = () => {
        console.log("clear");
        setSelectedStyles([]);
        setSelectedFeatures([]);
    };

    const { data, loading } = useFetch<Store[]>(
        `http://localhost:3000/api/home/sort-rate`
    );

    console.log(data);

    return (
        <div className="p-10 flex flex-row gap-10">
            <div className={cx("filter")}>
                <div className="w-full flex flex-row items-center justify-between">
                    <h2 className="text-3xl font-bold">Filter</h2>
                    <Button
                        icon={
                            <FontAwesomeIcon
                                icon={faRotateRight}
                                onClick={handleClearFilter}
                            />
                        }
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

export default Home;
