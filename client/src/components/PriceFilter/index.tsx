type Props = {
    selectedPrice: {
        min_price: number;
        max_price: number;
    };
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const prices = [
    {
        min_price: 0,
        max_price: 100000,
    },
    {
        min_price: 100000,
        max_price: 200000,
    },
    {
        min_price: 200000,
        max_price: Infinity,
    },
];

function PriceFilter({ selectedPrice, onChange }: Props) {
    return (
        <div>
            <h4 className="text-md font-semibold mb-2">Price</h4>
            {prices.map((price, index) => (
                <label key={index} className="flex items-center space-x-2 cursor-pointer">
                    <input
                        type="radio"
                        className="rounded cursor-pointer"
                        value={`${price.min_price}-${price.max_price}`}
                        checked={
                            selectedPrice.min_price === price.min_price &&
                            selectedPrice.max_price === price.max_price
                        }
                        onChange={onChange}
                    />
                    <span>
                        {price.max_price === Infinity
                            ? `From ${price.min_price}`
                            : `${price.min_price} ~ ${price.max_price}`}
                    </span>
                </label>
            ))}
        </div>
    );
}

export default PriceFilter;
