import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Button";
import FeatureFilter from "../FeatureFilter";
import PriceFilter from "../PriceFilter";
import StyleFilter from "../StyleFilter";
import { useEffect, useState } from "react";
import { useSearchContext } from "../../services/contexts/SearchContext";
import { useNavigate } from "react-router-dom";

function Filter() {
    const search = useSearchContext();
    const navigate = useNavigate();

    const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
    const [selectedPrice, setSelectedPrice] = useState<{
        min_price: number;
        max_price: number;
    }>({
        min_price: 0,
        max_price: 100000,
    });

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
            max_price:
                priceArr[1] === "Infinity" ? Infinity : parseInt(priceArr[1]),
        };
        console.log(price);
        setSelectedPrice(price);
        navigate("/search")
    };

    const handleClearFilter = () => {
        console.log("clear");
        setSelectedStyles([]);
        setSelectedFeatures([]);
    };

    return (
        <div className="bg-[var(--color-secondary)] w-[250px] h-full rounded-[10px] pl-[25px] pb-[25px] flex flex-col gap-[20px]">
            <div className="w-full flex flex-row items-center justify-between">
                <h2 className="text-3xl font-bold">Filter</h2>
                <Button
                    onClick={handleClearFilter}
                    icon={<FontAwesomeIcon icon={faRotateRight} />}
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
    );
}

export default Filter;
