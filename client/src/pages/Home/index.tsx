import classNames from "classnames/bind";
import styles from "./Home.module.css";
import Filter from "../../components/Filter";
import Tippy from "@tippyjs/react/headless";
import { useState } from "react";
import Popper from "../../components/Popper";
import PopperItem from "../../components/PopperItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownWideShort } from "@fortawesome/free-solid-svg-icons";
import Card from "../../components/Card";
import Pagination from "../../components/Pagination";
import useFetch from "../../services/hooks/useFetch";
const BASE_URL = import.meta.env.BASE_URL || "";

const cx = classNames.bind(styles);

type Store = {
    _id: string;
    name: string;
    address: string;
    logo: string;
    price: number;
    rate: number;
};

function Home() {
    const [sortOption, setSortOption] = useState("Highest rated");

    const [visible, setVisible] = useState(false);
    const handleToggleSort = () => {
        setVisible(!visible);
    };

    const { data, loading } = useFetch<Store[]>(`http://localhost:3000/api/home/sort-rate`);

    console.log(data)

    return (
        <div className="p-10 flex flex-row gap-10">
            <Filter />
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
                                            setSortOption("Highest rated");
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
