type Props = {
    selectedStyles: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const styles = ["Working Space", "Tropical", "Industrial", "Modern", "Vintage"];

function StyleFilter({ selectedStyles, onChange }: Props) {
    return (
        <div>
            <h4 className="text-md font-semibold mb-2">Styles</h4>
            {styles.map((style, index) => (
                <label key={index} className="flex items-center space-x-2 cursor-pointer">
                    <input
                        type="checkbox"
                        className="rounded cursor-pointer"
                        value={style}
                        checked={selectedStyles.includes(style)}
                        onChange={onChange}
                    />
                    <span>{style}</span>
                </label>
            ))}
        </div>
    );
}

export default StyleFilter;
