import classNames from "classnames/bind";
import styles from "./SearchBar.module.css";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useSearchContext } from "../../services/contexts/SearchContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function SearchBar() {

    const navigate = useNavigate();
    const search = useSearchContext();
    const [destination, setDestination] = useState<string>(search.destination);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        search.saveSearchValues(destination);
        navigate("/search");
    };

    return (
        <form className={cx("wrapper")} onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search for a coffee or location"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className={cx("input")}
            />
            <Button
                type="submit"
                icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
            ></Button>
        </form>
    );
}

export default SearchBar;
