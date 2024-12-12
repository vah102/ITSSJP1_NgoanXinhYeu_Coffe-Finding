import Button from "../Button";
import SearchBar from "../SearchBar";
import styles from "./Header.module.css";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import config from "../../config";
import { useSearchContext } from "../../services/contexts/SearchContext";

const cx = classNames.bind(styles);

function Header() {
    const handleReset = () => {
        const search = useSearchContext();
        search.saveSearchValues("");
        search.saveStyleValues([]);
        search.saveFeatureValues([]);
    };

    return (
        <div className={cx("wrapper")}>
            <div className="h-28 w-full">
                <img
                    src={import.meta.env.BASE_URL + "bg.png"}
                    alt=""
                    className="w-full h-full object-cover object-top"
                />
            </div>

            <div className="absolute flex flex-row justify-between items-center top-0 w-full h-full px-32">
                <Link to={config.routes.home} onClick={handleReset}>
                    <div className="flex flex-row items-center gap-3">
                        <img
                            className="w-24 h-24"
                            src={import.meta.env.BASE_URL + "icon.png"}
                            alt=""
                        />
                        <h1 className="font-bold text-6xl">FiCofe</h1>
                    </div>
                </Link>
                <SearchBar />
                <div className="flex">
                    <Button to="/signin">
                        <span className="text-white">Login</span>
                    </Button>
                    <Button primary to="/signup">
                        <span className="text-white">Signup</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Header;
