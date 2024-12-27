import { useTranslation } from "react-i18next";
type Props = {
    selectedStyles: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};


function StyleFilter({ selectedStyles, onChange }: Props) {
    const { t } = useTranslation();
    const styles = [
        t("styles.working_space"),
        t("styles.tropical"),
        t("styles.industrial"),
        t("styles.modern"),
        t("styles.vintage")
    ];
    return (
        <div>
             <h4 className="text-md font-semibold mb-2">{t("styles.styles")}</h4> 
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
