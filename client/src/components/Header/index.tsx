import Button from "../Button";
import SearchBar from "../SearchBar";
import styles from "./Header.module.css";
import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import config from "../../config";
import { useSearchContext } from "../../services/contexts/SearchContext";
import useFetch from "../../services/hooks/useFetch";
import Tippy from "@tippyjs/react/headless";
import PopperItem from "../PopperItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import Popper from "../Popper";
import { useEffect, useState } from "react";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
const cx = classNames.bind(styles);

type User = {
    username: string;
    avatar: string;
};

function Header() {
    const handleReset = () => {
        const search = useSearchContext();
        search.saveSearchValues("");
        search.saveStyleValues([]);
        search.saveFeatureValues([]);
    };

    const { data, loading } = useFetch<User>(`http://localhost:3000/api/user/profile`);


    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:3000/auth/logout", {
                method: "POST",
                credentials: "include",
            });
            if (response.ok) {
                navigate("/signin");
            }
        } catch (error) {
            console.error("Có lỗi xảy ra:", error);
        }
    };

    const [visible, setVisible] = useState(false);
    const handleToggleMenu = () => {
        setVisible(!visible);
    };

    const [language, setLanguage] = useState(localStorage.getItem("language") || "en"); // Lấy mã ngôn ngữ từ localStorage
    useEffect(() => {
        const savedLanguage = localStorage.getItem("language") || "en";
        i18n.changeLanguage(savedLanguage); // Đồng bộ với i18n khi load trang
    }, []);
    const [visibleLang, setVisibleLang] = useState(false);
    const handleToggleLang = () => {
        setVisibleLang(!visibleLang);
    };
    const handleChangeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
        setLanguage(lang);
        localStorage.setItem("language", lang); // Lưu vào localStorage
        setVisibleLang(false);
    };
    const getLanguageLabel = (lang: string) => {
        switch (lang) {
            case "en":
                return "English";
            case "vi":
                return "Tiếng Việt";
            case "jp":
                return "日本語";
            default:
                return "English";
        }
    };
    const { t } = useTranslation();
    return (
        <div className={cx("wrapper")}>
            <div className="h-[8rem] w-full">
                <img src={import.meta.env.BASE_URL + "bg.png"} alt="" className="w-full h-full object-cover object-top" />
            </div>

            <div className="absolute flex flex-row justify-between items-center top-0 w-full h-full px-32">
                <Link to={config.routes.home} onClick={handleReset}>
                    <div className="flex flex-row items-center gap-3">
                        <img className="w-24 h-24" src={import.meta.env.BASE_URL + "icon.png"} alt="" />
                        <h1 className="font-bold text-6xl text-[#4F310D]">FiCofe</h1>
                    </div>
                </Link>

                <div className="flex flex-col items-start justify-center space-y-4 relative">
                    <div className="w-full transform scale-[85%] origin-left">
                        <SearchBar />
                    </div>
                </div>

                <div className="flex flex-row items-center gap-5">
                    <div className="">
                        <Tippy
                            visible={visibleLang}
                            onClickOutside={handleToggleLang}
                            placement="bottom-end"
                            interactive
                            render={(attrs) => (
                                <div className={cx("user-menu")} tabIndex={-1} {...attrs}>
                                    <Popper>
                                        <PopperItem
                                            onClick={() => {
                                                handleChangeLanguage("en")
                                            }}
                                        >
                                            English
                                        </PopperItem>
                                        <PopperItem
                                            onClick={() => {
                                                handleChangeLanguage("jp")
                                            }}
                                        >
                                            日本語
                                        </PopperItem>
                                        <PopperItem
                                            onClick={() => {
                                                handleChangeLanguage("vi")
                                            }}
                                        >
                                            Tiếng Việt
                                        </PopperItem>
                                    </Popper>
                                </div>
                            )}
                        >
                            <div
                                className="flex flex-row items-center justify-between w-[130px] py-3 px-5 font-bold cursor-pointer gap-2 border-solid rounded-full border-white border-2"
                                onClick={handleToggleLang}
                            >
                                <p className="text-white">{getLanguageLabel(language)}</p>
                                <FontAwesomeIcon color="#fff" icon={faChevronDown} />
                            </div>
                        </Tippy>
                    </div>

                    <div className="flex flex-row gap-5">
                        {data ? (
                            <>
                                <p className="flex flex-row items-center font-bold text-white">{data.username}</p>
                                <Tippy
                                    visible={visible}
                                    onClickOutside={() => setVisible(false)}
                                    placement="bottom-end"
                                    interactive
                                    render={(attrs) => (
                                        <div className={cx("user-menu")} tabIndex={-1} {...attrs}>
                                            <Popper>
                                                <PopperItem to="/profile" icon={<FontAwesomeIcon icon={faUser} />}>
                                                    {t("header.profile")}
                                                </PopperItem>
                                                <PopperItem onClick={handleLogout} icon={<FontAwesomeIcon icon={faRightFromBracket} />}>
                                                    {t("header.logout")}
                                                </PopperItem>
                                            </Popper>
                                        </div>
                                    )}
                                >
                                    <img
                                        onClick={handleToggleMenu}
                                        className="w-[40px] h-[40px] rounded-full cursor-pointer"
                                        src={data.avatar}
                                        alt="avatar"
                                    // onError={handleAvaError}
                                    />
                                </Tippy>
                            </>
                        ) : (
                            <div className="flex">
                                <Button to="/signin">
                                    <span className="text-white"> {t("header.login")}</span>
                                </Button>
                                <Button primary to="/signup">
                                    <span className="text-white"> {t("header.signup")}</span>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
