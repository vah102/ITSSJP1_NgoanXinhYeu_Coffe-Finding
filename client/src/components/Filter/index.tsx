import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Button";
import FeatureFilter from "../FeatureFilter";
import PriceFilter from "../PriceFilter";
import StyleFilter from "../StyleFilter";
import { useEffect, useState } from "react";
import { useSearchContext } from "../../services/contexts/SearchContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
function Filter() {
    const { t } = useTranslation();
    const search = useSearchContext();
    const navigate = useNavigate();

    const savedData = localStorage.getItem("searchContext");
    const [selectedStyles, setSelectedStyles] = useState<string[]>(
        savedData ? JSON.parse(savedData).styles : []
    );
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>(
        savedData ? JSON.parse(savedData).features : []
    );
    const [selectedPrice, setSelectedPrice] = useState<{
        min_price: number | null;
        max_price: number | null;
    }>(
        savedData
            ? JSON.parse(savedData).price
            : {
                  min_price: null,
                  max_price: null,
              }
    );

    useEffect(() => {
        search.saveStyleValues(selectedStyles);
        search.saveFeatureValues(selectedFeatures);
        search.savePriceValues(selectedPrice);
    }, [selectedStyles, selectedFeatures, selectedPrice, search]);

    const handleStylesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const style = event.target.value;

        setSelectedStyles((prevStyles) =>
            event.target.checked
                ? [...prevStyles, style]
                : prevStyles.filter((prevStyle) => prevStyle !== style)
        );
        navigate(`/search`);
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
        navigate(`/search`);
    };

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const priceArr = event.target.value.split("-");
        const price = {
            min_price: parseInt(priceArr[0]),
            max_price: priceArr[1] === "null" ? null : parseInt(priceArr[1]),
        };
        setSelectedPrice(price);
        navigate(`/search`);
    };

    const handleClearFilter = () => {
        console.log("clear");
        search.saveSearchValues("");
        setSelectedStyles([]);
        setSelectedFeatures([]);
        setSelectedPrice({
            min_price: null,
            max_price: null,
        })
    };

    return (
        <div className="bg-[var(--color-secondary)] w-[250px] h-full rounded-[10px] pl-[25px] pb-[25px] flex flex-col mt-3">
            <div className="w-full flex flex-row items-center justify-between">
                <h2 className="text-3xl font-bold">{t("header.filter")}</h2>
                <Button
                    onClick={handleClearFilter}
                    icon={<FontAwesomeIcon icon={faRotateRight} />}
                >
                    {t("header.clear")}
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
    );
}

export default Filter;
