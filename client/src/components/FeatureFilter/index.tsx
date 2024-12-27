import { useTranslation } from "react-i18next";
type Props = {
    selectedFeatures: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
function FeatureFilter({ selectedFeatures, onChange }: Props) {
    const { t } = useTranslation();
    const features = [
        t("features.free_wifi"),
        t("features.free_parking"),
        t("features.air_conditioner"),
        t("features.power_outlet"),
        t("features.smoking_room"),
        t("features.smoking_no"),
        t("features.pet_allowed"),
        t("features.good_for_kids")
    ];
    return (
        <div>
            <h4 className="text-md font-semibold mb-2">{t("features.features")}</h4>
            {features.map((feature, index) => (
                <label key={index} className="flex items-center space-x-2 cursor-pointer">
                    <input
                        type="checkbox"
                        className="rounded cursor-pointer "
                        value={feature}
                        checked={selectedFeatures.includes(feature)}
                        onChange={onChange}
                    />
                    <span>{feature}</span>
                </label>
            ))}
        </div>
    );
}

export default FeatureFilter;
