type Props = {
    selectedFeatures: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const features = [
    "Free Wifi",
    "Pree Parking",
    "Air Conditioner",
    "Power Outlet",
    "Smoking Room",
    "Smoking: No",
    "Pet allowed",
    "Good for Kids",
];

function FeatureFilter({ selectedFeatures, onChange }: Props) {
    return (
        <div>
            <h4 className="text-md font-semibold mb-2">Features</h4>
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
