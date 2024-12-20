import React, { useContext, useState } from "react";

type SearchContext = {
    keyword: string;
    // sort: string;
    styles: string[];
    features: string[];
    price: {
        min_price: number;
        max_price: number;
    };
    queryParam: string;
    saveSearchValues: (keyword: string) => void;
    // saveSortValues: (sort: string) => void;
    saveStyleValues: (styles: string[]) => void;
    saveFeatureValues: (features: string[]) => void;
    savePriceValues: (price: { min_price: number; max_price: number }) => void;
    saveQueryParam: (queryParam: string) => void;
};

const SearchContext = React.createContext<SearchContext | undefined>(undefined);

type SearchContextProviderProps = {
    children: React.ReactNode;
};

export const SearchContextProvider = ({
    children,
}: SearchContextProviderProps) => {
    const [keyword, setKeyword] = useState<string>("");
    // const [sort, setSort] = useState<string>("highest_rated");
    const [styles, setStyles] = useState<string[]>([]);
    const [features, setFeatures] = useState<string[]>([]);
    const [price, setPrice] = useState<{
        min_price: number;
        max_price: number;
    }>({
        min_price: 0,
        max_price: 100000,
    });

    const [queryParam, setQueryParam] = useState<string>("");

    

    const saveSearchValues = (keyword: string) => {
        setKeyword(keyword);
    };

    // const saveSortValues = (sort: string) => {
    //     setSort(sort);
    // };

    const saveStyleValues = (styles: string[]) => {
        setStyles(styles);
    };

    const saveFeatureValues = (features: string[]) => {
        setFeatures(features);
    };

    const savePriceValues = (price: {
        min_price: number;
        max_price: number;
    }) => {
        setPrice(price);
    };

    const saveQueryParam = (queryParam: string) => {
        setQueryParam(queryParam);
    };

    return (
        <SearchContext.Provider
            value={{
                keyword,
                // sort,
                styles,
                features,
                price,
                queryParam,
                saveSearchValues,
                // saveSortValues,
                saveStyleValues,
                saveFeatureValues,
                savePriceValues,
                saveQueryParam,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};

export const useSearchContext = () => {
    const context = useContext(SearchContext);
    return context as SearchContext;
};
