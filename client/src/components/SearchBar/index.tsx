import classNames from "classnames/bind";
import styles from "./SearchBar.module.css";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useSearchContext } from "../../services/contexts/SearchContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);

interface Parameter {
    className?: string;
}

function SearchBar({ className }: Parameter) {
    const{t}=useTranslation();
    const navigate = useNavigate();
    const search = useSearchContext();
    const [keyword, setKeyword] = useState<string>(search.keyword);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        search.saveSearchValues(keyword);
        navigate(`/search`);
    };

    useEffect(() => {
        search.saveSearchValues(keyword);
    }, [keyword, search]);

    return (
        <form className={cx("wrapper", className)} onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder={t("header.search")}
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