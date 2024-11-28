import React, { useContext, useState } from "react";

type SearchContext = {
    keyword: string;
    sort: string;
    styles: string[];
    features: string[];
    saveSearchValues: (keyword: string) => void;
    saveSortValues: (sort: string) => void;
    saveStyleValues: (styles: string[]) => void;
    saveFeatureValues: (feature: string[]) => void;
};

const SearchContext = React.createContext<SearchContext | undefined>(undefined);

type SearchContextProviderProps = {
    children: React.ReactNode;
};

export const SearchContextProvider = ({
    children,
}: SearchContextProviderProps) => {
    const [keyword, setKeyword] = useState<string>("");
    const [sort, setSort] = useState<string>("highest_rated");
    const [styles, setStyles] = useState<string[]>([]);
    const [features, setFeatures] = useState<string[]>([]);

    const saveSearchValues = (keyword: string) => {
        setKeyword(keyword);
    };

    const saveSortValues = (sort: string) => {
        setSort(sort);
    };

    const saveStyleValues = (styles: string[]) => {
        setStyles(styles);
    }

    const saveFeatureValues = (features: string[]) => {
        setFeatures(features)
    }

    return (
        <SearchContext.Provider value={{ keyword, sort, styles, features, saveSearchValues, saveSortValues, saveStyleValues, saveFeatureValues }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearchContext = () => {
    const context = useContext(SearchContext);
    return context as SearchContext;
}
