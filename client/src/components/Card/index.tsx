import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Card.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faStar } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

type CardProps = {
    item: {
        store_id: string;
        name: string;
        address: string;
        logo: string;
        min_price: number;
        max_price: number;
        rate: number;
        distance: number;
    };
};

function Card({ item }: CardProps) {
    const [imageSrc, setImageSrc] = useState("");

    const handleImageError = () => {
        setImageSrc("/default.png");
    };

    useEffect(() => {
        console.log("Card rendered with:", item);
        setImageSrc(item.logo);
    }, [item]);

    return (
        <Link to={`/storedetail/${item.store_id}`} className={cx("wrapper")}>
            <div className={cx("card-img")}>
                <img src={imageSrc} alt="coffee" onError={handleImageError} />
            </div>
            <div className={cx("card-content")}>
                <span className="text-3xl font-bold mb-3 h-[2.5em] line-clamp-2">
                    {item.name}
                </span>
                <span className="mb-3 line-clamp-2">{item.address}</span>
                <span className="font-semibold">
                    {item.min_price} ~ {item.max_price} VND
                </span>
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row items-center gap-3">
                        <FontAwesomeIcon color="#F7CA4C" icon={faStar} />
                        <span>{item.rate}</span>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <FontAwesomeIcon color="#4F310D" icon={faLocationDot} />
                        <span>{Math.round(item.distance * 100) / 100} km</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default Card;
