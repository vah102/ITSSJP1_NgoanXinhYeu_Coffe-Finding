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
    const [keyword, setKeyword] = useState<string>(search.keyword);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        search.saveSearchValues(keyword);
        navigate("/search");
    };

    return (
        <form className={cx("wrapper")} onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search for a coffee or location"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
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
