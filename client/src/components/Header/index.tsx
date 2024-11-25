import Button from "../Button";
import TextField from "../TextField";
import { useState } from "react";
import styles from './Header.module.css'
import classNames from "classnames/bind";

const cx = classNames.bind(styles)

function Header() {

    const [searchValue, setSearchValue] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("hello")
    }

    return (
        <div className={cx('wrapper')}>
            <div className="h-32 w-full">
                <img
                    src={import.meta.env.BASE_URL + "bg.png"}
                    alt=""
                    className="w-full h-full object-cover object-top"
                />
            </div>

            <div className="absolute flex flex-row justify-between items-center top-0 w-full h-full px-32">
                <div className="flex flex-row items-center gap-3">
                    <img
                        className="w-24 h-24"
                        src={import.meta.env.BASE_URL + "icon.png"}
                        alt=""
                    />
                    <h1 className="font-bold text-6xl">FiCofe</h1>
                </div>
                <TextField
                    type="text"
                    placeholder="Search for a coffee or location"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onSubmit={handleSubmit}
                />
                <div>
                    <Button ><span className="text-white">Login</span></Button>
                    <Button primary><span className="text-white">Signup</span></Button>
                </div>
            </div>
        </div>
    );
}

export default Header;
