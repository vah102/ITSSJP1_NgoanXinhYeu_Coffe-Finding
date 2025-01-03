import { useEffect, useState } from "react";

type MenuProps = {
    item: {
        id: string;
        dish_name: string;
        dish_price: number;
        dish_image: string;
        description: string;
    };
};

function Menu({ item }: MenuProps) {
    const savedLanguage = localStorage.getItem("language") || "en";
    const [language, setLanguage] = useState(0);
    useEffect(() => {
        switch (savedLanguage) {
            case "en":
                setLanguage(0);
                break;
            case "jp":
                setLanguage(2);
                break;
            case "vi":
                setLanguage(1);
                break;
            default:
                setLanguage(0);
                break;
        }
    }, [savedLanguage]);

    const dish_name = item.dish_name.split("|").map((i) => i.trim());
    const description = item.description.split("|").map((i) => i.trim());

    return (
        <div className="p-4 border rounded-3xl">
            <div className="w-full h-64 rounded-lg overflow-hidden mb-2">
                <img
                    src={item.dish_image}
                    alt="Menu Item"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex justify-between items-center mb-1 h-[64px]">
                <h3 className="text-3xl font-semibold">{dish_name[language]}</h3>
                <span className="text-3xl font-medium text-gray-600">
                    {item.dish_price} VND
                </span>
            </div>
            <p className="text-2xl line-clamp-3">{description[language]}</p>
        </div>
    );
}

export default Menu;
